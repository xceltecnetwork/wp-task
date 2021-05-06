'use strict';

exports.__esModule = true;
exports.default = tokenize;
var SINGLE_QUOTE = 39;
var DOUBLE_QUOTE = 34;
var BACKSLASH = 92;
var SLASH = 47;
var NEWLINE = 10;
var SPACE = 32;
var FEED = 12;
var TAB = 9;
var CR = 13;
var OPEN_PARENTHESES = 40;
var CLOSE_PARENTHESES = 41;
var OPEN_CURLY = 123;
var CLOSE_CURLY = 125;
var SEMICOLON = 59;
var ASTERICK = 42;
var COLON = 58;
var AT = 64;
var COMMA = 44;

var RE_AT_END = /[ \n\t\r\f{()'"\\;/]/g;
var RE_NEW_LINE = /[\r\f\n]/g;
var RE_WORD_END = /[ \n\t\r\f(){}:;@!'"\\,]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\/("'\n]/;

function tokenize(input) {
  var tokens = [];
  var css = input.css.valueOf();

  var code = void 0,
      next = void 0,
      quote = void 0,
      lines = void 0,
      last = void 0,
      content = void 0,
      escape = void 0,
      nextLine = void 0,
      nextOffset = void 0,
      escaped = void 0,
      escapePos = void 0,
      prev = void 0,
      n = void 0;

  var length = css.length;
  var offset = -1;
  var line = 1;
  var pos = 0;

  function unclosed(what) {
    throw input.error('Unclosed ' + what, line, pos - offset);
  }

  while (pos < length) {
    code = css.charCodeAt(pos);

    if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
      offset = pos;
      line += 1;
    }

    switch (code) {
      case CR:
        if (css.charCodeAt(pos + 1) === NEWLINE) {
          offset = pos;
          line += 1;
          pos += 1;
          tokens.push(['newline', '\r\n', line - 1]);
        } else {
          tokens.push(['newline', '\r', line - 1]);
        }
        break;

      case FEED:
      case NEWLINE:
        tokens.push(['newline', css.slice(pos, pos + 1), line - 1]);
        break;

      case SPACE:
      case TAB:
        next = pos;
        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (code === SPACE || code === TAB);

        tokens.push(['space', css.slice(pos, next)]);
        pos = next - 1;
        break;

      case OPEN_CURLY:
        tokens.push(['{', '{', line, pos - offset]);
        break;

      case CLOSE_CURLY:
        tokens.push(['}', '}', line, pos - offset]);
        break;

      case COLON:
        tokens.push([':', ':', line, pos - offset]);
        break;

      case SEMICOLON:
        tokens.push([';', ';', line, pos - offset]);
        break;

      case COMMA:
        tokens.push([',', ',', line, pos - offset]);
        break;

      case OPEN_PARENTHESES:
        prev = tokens.length ? tokens[tokens.length - 1][1] : '';
        n = css.charCodeAt(pos + 1);
        if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(')', next + 1);
            if (next === -1) unclosed('bracket');
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);

          tokens.push(['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
          pos = next;
        } else {
          next = css.indexOf(')', pos + 1);
          content = css.slice(pos, next + 1);

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            tokens.push(['(', '(', line, pos - offset]);
          } else {
            tokens.push(['brackets', content, line, pos - offset, line, next - offset]);
            pos = next;
          }
        }

        break;

      case CLOSE_PARENTHESES:
        tokens.push([')', ')', line, pos - offset]);
        break;

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE:
        quote = code === SINGLE_QUOTE ? '\'' : '"';
        next = pos;
        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);
          if (next === -1) unclosed('quote');
          escapePos = next;
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);

        content = css.slice(pos, next + 1);
        lines = content.split('\n');
        last = lines.length - 1;

        if (last > 0) {
          nextLine = line + last;
          nextOffset = next - lines[last].length;
        } else {
          nextLine = line;
          nextOffset = offset;
        }

        tokens.push(['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset]);

        offset = nextOffset;
        line = nextLine;
        pos = next;
        break;

      case AT:
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }
        tokens.push(['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
        pos = next;
        break;

      case BACKSLASH:
        next = pos;
        escape = true;

        nextLine = line;

        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape = !escape;
        }
        code = css.charCodeAt(next + 1);
        if (escape) {
          if (code === CR && css.charCodeAt(next + 2) === NEWLINE) {
            next += 2;
            nextLine += 1;
            nextOffset = next;
          } else if (code === CR || code === NEWLINE || code === FEED) {
            next += 1;
            nextLine += 1;
            nextOffset = next;
          } else {
            next += 1;
          }
        }
        tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
        if (nextLine !== line) {
          line = nextLine;
          offset = nextOffset;
        }
        pos = next;
        break;

      default:
        n = css.charCodeAt(pos + 1);

        if (code === SLASH && n === ASTERICK) {
          next = css.indexOf('*/', pos + 2) + 1;
          if (next === 0) unclosed('comment');

          content = css.slice(pos, next + 1);
          lines = content.split('\n');
          last = lines.length - 1;

          if (last > 0) {
            nextLine = line + last;
            nextOffset = next - lines[last].length;
          } else {
            nextLine = line;
            nextOffset = offset;
          }

          tokens.push(['comment', content, line, pos - offset, nextLine, next - nextOffset]);

          offset = nextOffset;
          line = nextLine;
          pos = next;
        } else if (code === SLASH && n === SLASH) {
          RE_NEW_LINE.lastIndex = pos + 1;
          RE_NEW_LINE.test(css);
          if (RE_NEW_LINE.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_NEW_LINE.lastIndex - 2;
          }

          content = css.slice(pos, next + 1);

          tokens.push(['comment', content, line, pos - offset, line, next - offset, 'inline']);

          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }

          tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
          pos = next;
        }

        break;
    }

    pos++;
  }

  return tokens;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuaXplLmVzNiJdLCJuYW1lcyI6WyJ0b2tlbml6ZSIsIlNJTkdMRV9RVU9URSIsIkRPVUJMRV9RVU9URSIsIkJBQ0tTTEFTSCIsIlNMQVNIIiwiTkVXTElORSIsIlNQQUNFIiwiRkVFRCIsIlRBQiIsIkNSIiwiT1BFTl9QQVJFTlRIRVNFUyIsIkNMT1NFX1BBUkVOVEhFU0VTIiwiT1BFTl9DVVJMWSIsIkNMT1NFX0NVUkxZIiwiU0VNSUNPTE9OIiwiQVNURVJJQ0siLCJDT0xPTiIsIkFUIiwiQ09NTUEiLCJSRV9BVF9FTkQiLCJSRV9ORVdfTElORSIsIlJFX1dPUkRfRU5EIiwiUkVfQkFEX0JSQUNLRVQiLCJpbnB1dCIsInRva2VucyIsImNzcyIsInZhbHVlT2YiLCJjb2RlIiwibmV4dCIsInF1b3RlIiwibGluZXMiLCJsYXN0IiwiY29udGVudCIsImVzY2FwZSIsIm5leHRMaW5lIiwibmV4dE9mZnNldCIsImVzY2FwZWQiLCJlc2NhcGVQb3MiLCJwcmV2IiwibiIsImxlbmd0aCIsIm9mZnNldCIsImxpbmUiLCJwb3MiLCJ1bmNsb3NlZCIsIndoYXQiLCJlcnJvciIsImNoYXJDb2RlQXQiLCJwdXNoIiwic2xpY2UiLCJpbmRleE9mIiwidGVzdCIsInNwbGl0IiwibGFzdEluZGV4Il0sIm1hcHBpbmdzIjoiOzs7a0JBd0J3QkEsUTtBQXhCeEIsSUFBTUMsaUJBQU47QUFDQSxJQUFNQyxpQkFBTjtBQUNBLElBQU1DLGNBQU47QUFDQSxJQUFNQyxVQUFOO0FBQ0EsSUFBTUMsWUFBTjtBQUNBLElBQU1DLFVBQU47QUFDQSxJQUFNQyxTQUFOO0FBQ0EsSUFBTUMsT0FBTjtBQUNBLElBQU1DLE9BQU47QUFDQSxJQUFNQyxxQkFBTjtBQUNBLElBQU1DLHNCQUFOO0FBQ0EsSUFBTUMsZ0JBQU47QUFDQSxJQUFNQyxpQkFBTjtBQUNBLElBQU1DLGNBQU47QUFDQSxJQUFNQyxhQUFOO0FBQ0EsSUFBTUMsVUFBTjtBQUNBLElBQU1DLE9BQU47QUFDQSxJQUFNQyxV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QVosQ0FBaUIxQixHQUFqQjtBQUNBLGNBQUlMLFlBQVlpQyxTQUFaLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CekIsbUJBQU9ILElBQUllLE1BQUosR0FBYSxDQUFwQjtBQUNELFdBRkQsTUFFTztBQUNMWixtQkFBT1IsWUFBWWlDLFNBQVosR0FBd0IsQ0FBL0I7QUFDRDs7QUFFRHJCLG9CQUFVUCxJQUFJd0IsS0FBSixDQUFVTixHQUFWLEVBQWVmLE9BQU8sQ0FBdEIsQ0FBVjs7QUFFQUosaUJBQU93QixJQUFQLENBQVksQ0FBQyxTQUFELEVBQVloQixPQUFaLEVBQ1ZVLElBRFUsRUFDSkMsTUFBTUYsTUFERixFQUVWQyxJQUZVLEVBRUpkLE9BQU9hLE1BRkgsRUFHVixRQUhVLENBQVo7O0FBTUFFLGdCQUFNZixJQUFOO0FBQ0QsU0FsQk0sTUFrQkE7QUFDTFAsc0JBQVlnQyxTQUFaLEdBQXdCVixNQUFNLENBQTlCO0FBQ0F0QixzQkFBWThCLElBQVosQ0FBaUIxQixHQUFqQjtBQUNBLGNBQUlKLFlBQVlnQyxTQUFaLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CekIsbUJBQU9ILElBQUllLE1BQUosR0FBYSxDQUFwQjtBQUNELFdBRkQsTUFFTztBQUNMWixtQkFBT1AsWUFBWWdDLFNBQVosR0FBd0IsQ0FBL0I7QUFDRDs7QUFFRDdCLGlCQUFPd0IsSUFBUCxDQUFZLENBQUMsTUFBRCxFQUFTdkIsSUFBSXdCLEtBQUosQ0FBVU4sR0FBVixFQUFlZixPQUFPLENBQXRCLENBQVQsRUFDVmMsSUFEVSxFQUNKQyxNQUFNRixNQURGLEVBRVZDLElBRlUsRUFFSmQsT0FBT2EsTUFGSCxDQUFaO0FBSUFFLGdCQUFNZixJQUFOO0FBQ0Q7O0FBRUQ7QUFqUEo7O0FBb1BBZTtBQUNEOztBQUVELFNBQU9uQixNQUFQO0FBQ0QiLCJmaWxlIjoidG9rZW5pemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTSU5HTEVfUVVPVEUgPSAnXFwnJy5jaGFyQ29kZUF0KDApXG5jb25zdCBET1VCTEVfUVVPVEUgPSAnXCInLmNoYXJDb2RlQXQoMClcbmNvbnN0IEJBQ0tTTEFTSCA9ICdcXFxcJy5jaGFyQ29kZUF0KDApXG5jb25zdCBTTEFTSCA9ICcvJy5jaGFyQ29kZUF0KDApXG5jb25zdCBORVdMSU5FID0gJ1xcbicuY2hhckNvZGVBdCgwKVxuY29uc3QgU1BBQ0UgPSAnICcuY2hhckNvZGVBdCgwKVxuY29uc3QgRkVFRCA9ICdcXGYnLmNoYXJDb2RlQXQoMClcbmNvbnN0IFRBQiA9ICdcXHQnLmNoYXJDb2RlQXQoMClcbmNvbnN0IENSID0gJ1xccicuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9QQVJFTlRIRVNFUyA9ICcoJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9QQVJFTlRIRVNFUyA9ICcpJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX0NVUkxZID0gJ3snLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX0NVUkxZID0gJ30nLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNFTUlDT0xPTiA9ICc7Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBU1RFUklDSyA9ICcqJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDT0xPTiA9ICc6Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBVCA9ICdAJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDT01NQSA9ICcsJy5jaGFyQ29kZUF0KDApXG5cbmNvbnN0IFJFX0FUX0VORCA9IC9bIFxcblxcdFxcclxcZnsoKSdcIlxcXFw7L10vZ1xuY29uc3QgUkVfTkVXX0xJTkUgPSAvW1xcclxcZlxcbl0vZ1xuY29uc3QgUkVfV09SRF9FTkQgPSAvWyBcXG5cXHRcXHJcXGYoKXt9OjtAISdcIlxcXFwsXXxcXC8oPz1cXCopL2dcbmNvbnN0IFJFX0JBRF9CUkFDS0VUID0gLy5bXFxcXC8oXCInXFxuXS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9rZW5pemUgKGlucHV0KSB7XG4gIGxldCB0b2tlbnMgPSBbXVxuICBsZXQgY3NzID0gaW5wdXQuY3NzLnZhbHVlT2YoKVxuXG4gIGxldCBjb2RlLCBuZXh0LCBxdW90ZSwgbGluZXMsIGxhc3QsIGNvbnRlbnQsIGVzY2FwZSxcbiAgICBuZXh0TGluZSwgbmV4dE9mZnNldCwgZXNjYXBlZCwgZXNjYXBlUG9zLCBwcmV2LCBuXG5cbiAgbGV0IGxlbmd0aCA9IGNzcy5sZW5ndGhcbiAgbGV0IG9mZnNldCA9IC0xXG4gIGxldCBsaW5lID0gMVxuICBsZXQgcG9zID0gMFxuXG4gIGZ1bmN0aW9uIHVuY2xvc2VkICh3aGF0KSB7XG4gICAgdGhyb3cgaW5wdXQuZXJyb3IoJ1VuY2xvc2VkICcgKyB3aGF0LCBsaW5lLCBwb3MgLSBvZmZzZXQpXG4gIH1cblxuICB3aGlsZSAocG9zIDwgbGVuZ3RoKSB7XG4gICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KHBvcylcblxuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IE5FV0xJTkUgfHxcbiAgICAgIGNvZGUgPT09IEZFRUQgfHxcbiAgICAgIChjb2RlID09PSBDUiAmJiBjc3MuY2hhckNvZGVBdChwb3MgKyAxKSAhPT0gTkVXTElORSlcbiAgICApIHtcbiAgICAgIG9mZnNldCA9IHBvc1xuICAgICAgbGluZSArPSAxXG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIENSOlxuICAgICAgICBpZiAoY3NzLmNoYXJDb2RlQXQocG9zICsgMSkgPT09IE5FV0xJTkUpIHtcbiAgICAgICAgICBvZmZzZXQgPSBwb3NcbiAgICAgICAgICBsaW5lICs9IDFcbiAgICAgICAgICBwb3MgKz0gMVxuICAgICAgICAgIHRva2Vucy5wdXNoKFsnbmV3bGluZScsICdcXHJcXG4nLCBsaW5lIC0gMV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2goWyduZXdsaW5lJywgJ1xccicsIGxpbmUgLSAxXSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIEZFRUQ6XG4gICAgICBjYXNlIE5FV0xJTkU6XG4gICAgICAgIHRva2Vucy5wdXNoKFsnbmV3bGluZScsIGNzcy5zbGljZShwb3MsIHBvcyArIDEpLCBsaW5lIC0gMV0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICBjYXNlIFRBQjpcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KG5leHQpXG4gICAgICAgIH0gd2hpbGUgKGNvZGUgPT09IFNQQUNFIHx8IGNvZGUgPT09IFRBQilcblxuICAgICAgICB0b2tlbnMucHVzaChbJ3NwYWNlJywgY3NzLnNsaWNlKHBvcywgbmV4dCldKVxuICAgICAgICBwb3MgPSBuZXh0IC0gMVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIE9QRU5fQ1VSTFk6XG4gICAgICAgIHRva2Vucy5wdXNoKFsneycsICd7JywgbGluZSwgcG9zIC0gb2Zmc2V0XSlcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSBDTE9TRV9DVVJMWTpcbiAgICAgICAgdG9rZW5zLnB1c2goWyd9JywgJ30nLCBsaW5lLCBwb3MgLSBvZmZzZXRdKVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIENPTE9OOlxuICAgICAgICB0b2tlbnMucHVzaChbJzonLCAnOicsIGxpbmUsIHBvcyAtIG9mZnNldF0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgU0VNSUNPTE9OOlxuICAgICAgICB0b2tlbnMucHVzaChbJzsnLCAnOycsIGxpbmUsIHBvcyAtIG9mZnNldF0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgQ09NTUE6XG4gICAgICAgIHRva2Vucy5wdXNoKFsnLCcsICcsJywgbGluZSwgcG9zIC0gb2Zmc2V0XSlcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSBPUEVOX1BBUkVOVEhFU0VTOlxuICAgICAgICBwcmV2ID0gdG9rZW5zLmxlbmd0aCA/IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMV0gOiAnJ1xuICAgICAgICBuID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSlcbiAgICAgICAgaWYgKHByZXYgPT09ICd1cmwnICYmIG4gIT09IFNJTkdMRV9RVU9URSAmJiBuICE9PSBET1VCTEVfUVVPVEUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiAhPT0gU1BBQ0UgJiYgbiAhPT0gTkVXTElORSAmJiBuICE9PSBUQUIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiAhPT0gRkVFRCAmJiBuICE9PSBDUikge1xuICAgICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZignKScsIG5leHQgKyAxKVxuICAgICAgICAgICAgaWYgKG5leHQgPT09IC0xKSB1bmNsb3NlZCgnYnJhY2tldCcpXG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgICBlc2NhcGVQb3MgLT0gMVxuICAgICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChlc2NhcGVkKVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWydicmFja2V0cycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgIGxpbmUsIHBvcyAtIG9mZnNldCxcbiAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICBdKVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyknLCBwb3MgKyAxKVxuICAgICAgICAgIGNvbnRlbnQgPSBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSlcblxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSB8fCBSRV9CQURfQlJBQ0tFVC50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaChbJygnLCAnKCcsIGxpbmUsIHBvcyAtIG9mZnNldF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKFsnYnJhY2tldHMnLCBjb250ZW50LFxuICAgICAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSBDTE9TRV9QQVJFTlRIRVNFUzpcbiAgICAgICAgdG9rZW5zLnB1c2goWycpJywgJyknLCBsaW5lLCBwb3MgLSBvZmZzZXRdKVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIFNJTkdMRV9RVU9URTpcbiAgICAgIGNhc2UgRE9VQkxFX1FVT1RFOlxuICAgICAgICBxdW90ZSA9IGNvZGUgPT09IFNJTkdMRV9RVU9URSA/ICdcXCcnIDogJ1wiJ1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YocXVvdGUsIG5leHQgKyAxKVxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkgdW5jbG9zZWQoJ3F1b3RlJylcbiAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgd2hpbGUgKGNzcy5jaGFyQ29kZUF0KGVzY2FwZVBvcyAtIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICAgIGVzY2FwZVBvcyAtPSAxXG4gICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGVzY2FwZWQpXG5cbiAgICAgICAgY29udGVudCA9IGNzcy5zbGljZShwb3MsIG5leHQgKyAxKVxuICAgICAgICBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpXG4gICAgICAgIGxhc3QgPSBsaW5lcy5sZW5ndGggLSAxXG5cbiAgICAgICAgaWYgKGxhc3QgPiAwKSB7XG4gICAgICAgICAgbmV4dExpbmUgPSBsaW5lICsgbGFzdFxuICAgICAgICAgIG5leHRPZmZzZXQgPSBuZXh0IC0gbGluZXNbbGFzdF0ubGVuZ3RoXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dExpbmUgPSBsaW5lXG4gICAgICAgICAgbmV4dE9mZnNldCA9IG9mZnNldFxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5zLnB1c2goWydzdHJpbmcnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksXG4gICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgIG5leHRMaW5lLCBuZXh0IC0gbmV4dE9mZnNldFxuICAgICAgICBdKVxuXG4gICAgICAgIG9mZnNldCA9IG5leHRPZmZzZXRcbiAgICAgICAgbGluZSA9IG5leHRMaW5lXG4gICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSBBVDpcbiAgICAgICAgUkVfQVRfRU5ELmxhc3RJbmRleCA9IHBvcyArIDFcbiAgICAgICAgUkVfQVRfRU5ELnRlc3QoY3NzKVxuICAgICAgICBpZiAoUkVfQVRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoIC0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQgPSBSRV9BVF9FTkQubGFzdEluZGV4IC0gMlxuICAgICAgICB9XG4gICAgICAgIHRva2Vucy5wdXNoKFsnYXQtd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICBdKVxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgQkFDS1NMQVNIOlxuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGVzY2FwZSA9IHRydWVcblxuICAgICAgICBuZXh0TGluZSA9IGxpbmVcblxuICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBlc2NhcGUgPSAhZXNjYXBlXG4gICAgICAgIH1cbiAgICAgICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKVxuICAgICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IENSICYmIGNzcy5jaGFyQ29kZUF0KG5leHQgKyAyKSA9PT0gTkVXTElORSkge1xuICAgICAgICAgICAgbmV4dCArPSAyXG4gICAgICAgICAgICBuZXh0TGluZSArPSAxXG4gICAgICAgICAgICBuZXh0T2Zmc2V0ID0gbmV4dFxuICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gQ1IgfHwgY29kZSA9PT0gTkVXTElORSB8fCBjb2RlID09PSBGRUVEKSB7XG4gICAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICAgIG5leHRMaW5lICs9IDFcbiAgICAgICAgICAgIG5leHRPZmZzZXQgPSBuZXh0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMucHVzaChbJ3dvcmQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksXG4gICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgXSlcbiAgICAgICAgaWYgKG5leHRMaW5lICE9PSBsaW5lKSB7XG4gICAgICAgICAgbGluZSA9IG5leHRMaW5lXG4gICAgICAgICAgb2Zmc2V0ID0gbmV4dE9mZnNldFxuICAgICAgICB9XG4gICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbiA9IGNzcy5jaGFyQ29kZUF0KHBvcyArIDEpXG5cbiAgICAgICAgaWYgKGNvZGUgPT09IFNMQVNIICYmIG4gPT09IEFTVEVSSUNLKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcqLycsIHBvcyArIDIpICsgMVxuICAgICAgICAgIGlmIChuZXh0ID09PSAwKSB1bmNsb3NlZCgnY29tbWVudCcpXG5cbiAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG4gICAgICAgICAgbGluZXMgPSBjb250ZW50LnNwbGl0KCdcXG4nKVxuICAgICAgICAgIGxhc3QgPSBsaW5lcy5sZW5ndGggLSAxXG5cbiAgICAgICAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgICAgICAgIG5leHRMaW5lID0gbGluZSArIGxhc3RcbiAgICAgICAgICAgIG5leHRPZmZzZXQgPSBuZXh0IC0gbGluZXNbbGFzdF0ubGVuZ3RoXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRMaW5lID0gbGluZVxuICAgICAgICAgICAgbmV4dE9mZnNldCA9IG9mZnNldFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsnY29tbWVudCcsIGNvbnRlbnQsXG4gICAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgICBuZXh0TGluZSwgbmV4dCAtIG5leHRPZmZzZXRcbiAgICAgICAgICBdKVxuXG4gICAgICAgICAgb2Zmc2V0ID0gbmV4dE9mZnNldFxuICAgICAgICAgIGxpbmUgPSBuZXh0TGluZVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSBTTEFTSCAmJiBuID09PSBTTEFTSCkge1xuICAgICAgICAgIFJFX05FV19MSU5FLmxhc3RJbmRleCA9IHBvcyArIDFcbiAgICAgICAgICBSRV9ORVdfTElORS50ZXN0KGNzcylcbiAgICAgICAgICBpZiAoUkVfTkVXX0xJTkUubGFzdEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aCAtIDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dCA9IFJFX05FV19MSU5FLmxhc3RJbmRleCAtIDJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ2NvbW1lbnQnLCBjb250ZW50LFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldCxcbiAgICAgICAgICAgICdpbmxpbmUnXG4gICAgICAgICAgXSlcblxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBSRV9XT1JEX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgICAgUkVfV09SRF9FTkQudGVzdChjc3MpXG4gICAgICAgICAgaWYgKFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQgPSBSRV9XT1JEX0VORC5sYXN0SW5kZXggLSAyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyd3b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICAgIF0pXG4gICAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBwb3MrK1xuICB9XG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuIl19