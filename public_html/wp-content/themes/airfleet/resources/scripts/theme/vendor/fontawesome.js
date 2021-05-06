/**
 * Only import specific icons from fontawesome.
 * Search for icons here: https://fontawesome.com/icons?d=gallery
 * Example:
 *
 * import { faCircle } from '@fortawesome/free-solid-svg-icons';
 * import { dom, library } from '@fortawesome/fontawesome-svg-core';
 * import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
 *
 * library.add(faCircle, faLinkedinIn, faTwitter, faFacebookF);
 *
 * dom.watch();
 */

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF, faInstagram, faLinkedinIn, faTwitter, faEnvelope);
dom.watch();
