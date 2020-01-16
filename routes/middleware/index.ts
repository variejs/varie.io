/*
|--------------------------------------------------------------------------
| Route Middleware
|--------------------------------------------------------------------------
| You can setup your global route middleware here, these will execute
| in the order in which you provide them
|
*/

import CloseMobileMenu from "./CloseMobileMenu";
import GoogleAnalytics from "./GoogleAnalytics";

export default {
  CloseMobileMenu,
  GoogleAnalytics,
};
