(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var CART_API = "/api/storefront/carts";

var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$("[data-shop-by-price]").length) return;

    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }

    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };

  _proto.onShowProductSecondImage = function onShowProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-hoverimage");
    card.attr("srcset", image);
  };

  _proto.onRemoveProductSecondImage = function onRemoveProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-src");
    card.attr("srcset", image);
  };

  _proto.createCart = function createCart(url, items) {
    var cartItems = {
      lineItems: items
    };
    var body = JSON.stringify(cartItems);
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    }).then(function (response) {
      return response.json();
    });
  };

  _proto.getCart = function getCart(url) {
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    });
  };

  _proto.deleteCartItems = function deleteCartItems(url, cartId) {
    return fetch(url + "/" + cartId, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response;
    });
  };

  _proto.onAddAllToCart = function onAddAllToCart() {
    var products = [];

    for (var i = 0; i < this.context.categoryProducts.length; i++) {
      products = [].concat(products, [{
        quantity: this.context.categoryProducts[i].qty_in_cart + 1,
        productId: this.context.categoryProducts[i].id
      }]);
    }

    this.createCart(CART_API, products).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "block");
        $(".addNotification").css("display", "block");
        $(".removeNotification").css("display", "none");
        setTimeout(function () {
          $(".addNotification").css("display", "none");
        }, 5000);
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };

  _proto.onRemoveAllItems = function onRemoveAllItems() {
    var _this3 = this;

    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      return _this3.deleteCartItems(CART_API, data[0].id);
    }).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "none");
        $(".addNotification").css("display", "none");
        $(".removeNotification").css("display", "block");
        setTimeout(function () {
          $(".removeNotification").css("display", "none");
        }, 5000);
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };

  _proto.onCheckCart = function onCheckCart() {
    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      if (data.length > 0) {
        $("#removeAllItems").css("display", "block");
      } else {
        $("#removeAllItems").css("display", "none");
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };

  _proto.onReady = function onReady() {
    var _this4 = this;

    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this4.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }

    $("a.reset-btn").on("click", function () {
      return _this4.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.onCheckCart();
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
    $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
    $(".card-figure").hover(this.onShowProductSecondImage.bind(this), this.onRemoveProductSecondImage.bind(this));
    this.ariaNotifyNoProducts();
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ0FSVF9BUEkiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uU2hvd1Byb2R1Y3RTZWNvbmRJbWFnZSIsImUiLCJjYXJkIiwiY3VycmVudFRhcmdldCIsImZpbmQiLCJpbWFnZSIsIm9uUmVtb3ZlUHJvZHVjdFNlY29uZEltYWdlIiwiY3JlYXRlQ2FydCIsInVybCIsIml0ZW1zIiwiY2FydEl0ZW1zIiwibGluZUl0ZW1zIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJnZXRDYXJ0IiwiZGVsZXRlQ2FydEl0ZW1zIiwiY2FydElkIiwib25BZGRBbGxUb0NhcnQiLCJwcm9kdWN0cyIsImkiLCJjYXRlZ29yeVByb2R1Y3RzIiwicXVhbnRpdHkiLCJxdHlfaW5fY2FydCIsInByb2R1Y3RJZCIsImlkIiwiZGF0YSIsImNzcyIsInNldFRpbWVvdXQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJvblJlbW92ZUFsbEl0ZW1zIiwib25DaGVja0NhcnQiLCJvblJlYWR5IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImhvdmVyIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsUUFBUSxHQUFHLHVCQUFqQjs7SUFFcUJDLFE7OztBQUNuQixvQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixvQ0FBTUEsT0FBTjtBQUNBLFVBQUtDLG9CQUFMLEdBQTRCQywwR0FBMkIsQ0FBQ0YsT0FBRCxDQUF2RDtBQUZtQjtBQUdwQjs7OztTQUVERyx1QixHQUFBLGlDQUF3QkMsUUFBeEIsRUFBa0NDLFFBQWxDLEVBQTRDQyxjQUE1QyxFQUE0RDtBQUMxREYsWUFBUSxDQUFDRyxJQUFULENBQWM7QUFDWkMsVUFBSSxFQUFFSCxRQURNO0FBRVosbUJBQWFDO0FBRkQsS0FBZDtBQUlELEc7O1NBRURHLCtCLEdBQUEsMkNBQWtDO0FBQUE7O0FBQ2hDLFFBQUksQ0FBQ0MsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJDLE1BQS9CLEVBQXVDOztBQUV2QyxRQUFJRCxDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkUsUUFBckIsQ0FBOEIsV0FBOUIsQ0FBSixFQUFnRDtBQUM5Q0YsT0FBQyxDQUFDLDRCQUFELENBQUQsQ0FBZ0NHLEtBQWhDO0FBQ0Q7O0FBRURILEtBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCSSxFQUF0QixDQUF5QixPQUF6QixFQUFrQztBQUFBLGFBQ2hDLE1BQUksQ0FBQ1gsdUJBQUwsQ0FDRU8sQ0FBQyxDQUFDLDJCQUFELENBREgsRUFFRSxRQUZGLEVBR0UsV0FIRixDQURnQztBQUFBLEtBQWxDO0FBT0QsRzs7U0FFREssd0IsR0FBQSxrQ0FBeUJDLENBQXpCLEVBQTRCO0FBQzFCLFFBQU1DLElBQUksR0FBR1AsQ0FBQyxDQUFDTSxDQUFDLENBQUNFLGFBQUgsQ0FBRCxDQUFtQkMsSUFBbkIsQ0FBd0IsYUFBeEIsQ0FBYjtBQUNBLFFBQU1DLEtBQUssR0FBR0gsSUFBSSxDQUFDVixJQUFMLENBQVUsaUJBQVYsQ0FBZDtBQUNBVSxRQUFJLENBQUNWLElBQUwsQ0FBVSxRQUFWLEVBQW9CYSxLQUFwQjtBQUNELEc7O1NBRURDLDBCLEdBQUEsb0NBQTJCTCxDQUEzQixFQUE4QjtBQUM1QixRQUFNQyxJQUFJLEdBQUdQLENBQUMsQ0FBQ00sQ0FBQyxDQUFDRSxhQUFILENBQUQsQ0FBbUJDLElBQW5CLENBQXdCLGFBQXhCLENBQWI7QUFDQSxRQUFNQyxLQUFLLEdBQUdILElBQUksQ0FBQ1YsSUFBTCxDQUFVLFVBQVYsQ0FBZDtBQUNBVSxRQUFJLENBQUNWLElBQUwsQ0FBVSxRQUFWLEVBQW9CYSxLQUFwQjtBQUNELEc7O1NBRURFLFUsR0FBQSxvQkFBV0MsR0FBWCxFQUFnQkMsS0FBaEIsRUFBdUI7QUFDckIsUUFBTUMsU0FBUyxHQUFHO0FBQ2hCQyxlQUFTLEVBQUVGO0FBREssS0FBbEI7QUFHQSxRQUFNRyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixTQUFmLENBQWI7QUFFQSxXQUFPSyxLQUFLLENBQUNQLEdBQUQsRUFBTTtBQUNoQlEsWUFBTSxFQUFFLE1BRFE7QUFFaEJDLGlCQUFXLEVBQUUsYUFGRztBQUdoQkMsYUFBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FITztBQU1oQk4sVUFBSSxFQUFKQTtBQU5nQixLQUFOLENBQUwsQ0FPSk8sSUFQSSxDQU9DLFVBQUFDLFFBQVE7QUFBQSxhQUFJQSxRQUFRLENBQUNDLElBQVQsRUFBSjtBQUFBLEtBUFQsQ0FBUDtBQVFELEc7O1NBRURDLE8sR0FBQSxpQkFBUWQsR0FBUixFQUFhO0FBQ1gsV0FBT08sS0FBSyxDQUFDUCxHQUFELEVBQU07QUFBRVEsWUFBTSxFQUFFLEtBQVY7QUFBaUJDLGlCQUFXLEVBQUU7QUFBOUIsS0FBTixDQUFMLENBQTBERSxJQUExRCxDQUNMLFVBQUFDLFFBQVE7QUFBQSxhQUFJQSxRQUFRLENBQUNDLElBQVQsRUFBSjtBQUFBLEtBREgsQ0FBUDtBQUdELEc7O1NBRURFLGUsR0FBQSx5QkFBZ0JmLEdBQWhCLEVBQXFCZ0IsTUFBckIsRUFBNkI7QUFDM0IsV0FBT1QsS0FBSyxDQUFJUCxHQUFKLFNBQVdnQixNQUFYLEVBQXFCO0FBQy9CUixZQUFNLEVBQUUsUUFEdUI7QUFFL0JDLGlCQUFXLEVBQUUsYUFGa0I7QUFHL0JDLGFBQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURUO0FBSHNCLEtBQXJCLENBQUwsQ0FNSkMsSUFOSSxDQU1DLFVBQUFDLFFBQVE7QUFBQSxhQUFJQSxRQUFKO0FBQUEsS0FOVCxDQUFQO0FBT0QsRzs7U0FFREssYyxHQUFBLDBCQUFpQjtBQUNmLFFBQUlDLFFBQVEsR0FBRyxFQUFmOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUMsT0FBTCxDQUFhMkMsZ0JBQWIsQ0FBOEJoQyxNQUFsRCxFQUEwRCtCLENBQUMsRUFBM0QsRUFBK0Q7QUFDN0RELGNBQVEsYUFDSEEsUUFERyxHQUVOO0FBQ0VHLGdCQUFRLEVBQUUsS0FBSzVDLE9BQUwsQ0FBYTJDLGdCQUFiLENBQThCRCxDQUE5QixFQUFpQ0csV0FBakMsR0FBK0MsQ0FEM0Q7QUFFRUMsaUJBQVMsRUFBRSxLQUFLOUMsT0FBTCxDQUFhMkMsZ0JBQWIsQ0FBOEJELENBQTlCLEVBQWlDSztBQUY5QyxPQUZNLEVBQVI7QUFPRDs7QUFDRCxTQUFLekIsVUFBTCxDQUFnQnhCLFFBQWhCLEVBQTBCMkMsUUFBMUIsRUFDR1AsSUFESCxDQUNRLFVBQUFjLElBQUksRUFBSTtBQUNaLFVBQUlBLElBQUosRUFBVTtBQUNSdEMsU0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ1QyxHQUFyQixDQUF5QixTQUF6QixFQUFvQyxPQUFwQztBQUNBdkMsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0J1QyxHQUF0QixDQUEwQixTQUExQixFQUFxQyxPQUFyQztBQUNBdkMsU0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJ1QyxHQUF6QixDQUE2QixTQUE3QixFQUF3QyxNQUF4QztBQUNBQyxrQkFBVSxDQUFDLFlBQU07QUFDZnhDLFdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCdUMsR0FBdEIsQ0FBMEIsU0FBMUIsRUFBcUMsTUFBckM7QUFDRCxTQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0Q7QUFDRixLQVZILFdBV1MsVUFBQUUsR0FBRztBQUFBLGFBQUlDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjRixHQUFkLENBQUo7QUFBQSxLQVhaO0FBWUQsRzs7U0FFREcsZ0IsR0FBQSw0QkFBbUI7QUFBQTs7QUFDakIsU0FBS2pCLE9BQUwsQ0FDS3ZDLFFBREwsOEVBR0dvQyxJQUhILENBR1EsVUFBQWMsSUFBSTtBQUFBLGFBQUksTUFBSSxDQUFDVixlQUFMLENBQXFCeEMsUUFBckIsRUFBK0JrRCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFELEVBQXZDLENBQUo7QUFBQSxLQUhaLEVBSUdiLElBSkgsQ0FJUSxVQUFBYyxJQUFJLEVBQUk7QUFDWixVQUFJQSxJQUFKLEVBQVU7QUFDUnRDLFNBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCdUMsR0FBckIsQ0FBeUIsU0FBekIsRUFBb0MsTUFBcEM7QUFDQXZDLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCdUMsR0FBdEIsQ0FBMEIsU0FBMUIsRUFBcUMsTUFBckM7QUFDQXZDLFNBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCdUMsR0FBekIsQ0FBNkIsU0FBN0IsRUFBd0MsT0FBeEM7QUFDQUMsa0JBQVUsQ0FBQyxZQUFNO0FBQ2Z4QyxXQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QnVDLEdBQXpCLENBQTZCLFNBQTdCLEVBQXdDLE1BQXhDO0FBQ0QsU0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdEO0FBQ0YsS0FiSCxXQWNTLFVBQUFFLEdBQUc7QUFBQSxhQUFJQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZCxDQUFKO0FBQUEsS0FkWjtBQWVELEc7O1NBRURJLFcsR0FBQSx1QkFBYztBQUNaLFNBQUtsQixPQUFMLENBQ0t2QyxRQURMLDhFQUdHb0MsSUFISCxDQUdRLFVBQUFjLElBQUksRUFBSTtBQUNaLFVBQUlBLElBQUksQ0FBQ3JDLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNuQkQsU0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ1QyxHQUFyQixDQUF5QixTQUF6QixFQUFvQyxPQUFwQztBQUNELE9BRkQsTUFFTztBQUNMdkMsU0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ1QyxHQUFyQixDQUF5QixTQUF6QixFQUFvQyxNQUFwQztBQUNEO0FBQ0YsS0FUSCxXQVVTLFVBQUFFLEdBQUc7QUFBQSxhQUFJQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZCxDQUFKO0FBQUEsS0FWWjtBQVdELEc7O1NBRURLLE8sR0FBQSxtQkFBVTtBQUFBOztBQUNSLFNBQUtDLG9CQUFMO0FBRUEvQyxLQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQ0ksRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsVUFBQUUsQ0FBQztBQUFBLGFBQzlDLE1BQUksQ0FBQ2IsdUJBQUwsQ0FDRU8sQ0FBQyxDQUFDTSxDQUFDLENBQUNFLGFBQUgsQ0FBRCxDQUFtQndDLElBQW5CLEVBREYsRUFFRSxRQUZGLEVBR0UsUUFIRixDQUQ4QztBQUFBLEtBQWhEO0FBUUEsU0FBS2pELCtCQUFMO0FBRUFrRCw0RUFBZSxDQUFDLEtBQUszRCxPQUFOLENBQWY7O0FBRUEsUUFBSVUsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JDLE1BQXBCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLFdBQUtpRCxpQkFBTDtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtDLGNBQUwsR0FBc0IsS0FBS0EsY0FBTCxDQUFvQkMsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDQUMsc0VBQUssQ0FBQ2pELEVBQU4sQ0FBUyxrQkFBVCxFQUE2QixLQUFLK0MsY0FBbEM7QUFDRDs7QUFFRG5ELEtBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJJLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCO0FBQUEsYUFDM0IsTUFBSSxDQUFDa0Qsd0JBQUwsQ0FBOEJ0RCxDQUFDLENBQUMsb0JBQUQsQ0FBL0IsRUFBdUQsUUFBdkQsRUFBaUUsUUFBakUsQ0FEMkI7QUFBQSxLQUE3QjtBQUlBLFNBQUs2QyxXQUFMO0FBQ0E3QyxLQUFDLENBQUMsZUFBRCxDQUFELENBQW1CSSxFQUFuQixDQUFzQixPQUF0QixFQUErQixLQUFLMEIsY0FBTCxDQUFvQnNCLElBQXBCLENBQXlCLElBQXpCLENBQS9CO0FBQ0FwRCxLQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkksRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS3dDLGdCQUFMLENBQXNCUSxJQUF0QixDQUEyQixJQUEzQixDQUFqQztBQUNBcEQsS0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQnVELEtBQWxCLENBQ0UsS0FBS2xELHdCQUFMLENBQThCK0MsSUFBOUIsQ0FBbUMsSUFBbkMsQ0FERixFQUVFLEtBQUt6QywwQkFBTCxDQUFnQ3lDLElBQWhDLENBQXFDLElBQXJDLENBRkY7QUFLQSxTQUFLSSxvQkFBTDtBQUNELEc7O1NBRURBLG9CLEdBQUEsZ0NBQXVCO0FBQ3JCLFFBQU1DLGtCQUFrQixHQUFHekQsQ0FBQyxDQUFDLGlDQUFELENBQTVCOztBQUNBLFFBQUl5RCxrQkFBa0IsQ0FBQ3hELE1BQXZCLEVBQStCO0FBQzdCd0Qsd0JBQWtCLENBQUN0RCxLQUFuQjtBQUNEO0FBQ0YsRzs7U0FFRCtDLGlCLEdBQUEsNkJBQW9CO0FBQ2xCLGdDQU1JLEtBQUszRCxvQkFOVDtBQUFBLFFBQ3dCbUUsZUFEeEIseUJBQ0VDLG9CQURGO0FBQUEsUUFFd0JDLGVBRnhCLHlCQUVFQyxvQkFGRjtBQUFBLFFBR3lCQyxrQkFIekIseUJBR0VDLHFCQUhGO0FBQUEsUUFJeUJDLGtCQUp6Qix5QkFJRUMscUJBSkY7QUFBQSxRQUt1QkMsY0FMdkIseUJBS0VDLG1CQUxGO0FBT0EsUUFBTUMsd0JBQXdCLEdBQUdwRSxDQUFDLENBQUMsNEJBQUQsQ0FBbEM7QUFDQSxRQUFNcUUsdUJBQXVCLEdBQUdyRSxDQUFDLENBQUMsMkJBQUQsQ0FBakM7QUFDQSxRQUFNc0UsZUFBZSxHQUFHLEtBQUtoRixPQUFMLENBQWFpRix1QkFBckM7QUFDQSxRQUFNQyxjQUFjLEdBQUc7QUFDckJDLFlBQU0sRUFBRTtBQUNOQyxnQkFBUSxFQUFFO0FBQ1JDLHVCQUFhLEVBQUUsSUFEUDtBQUVSNUMsa0JBQVEsRUFBRTtBQUNSNkMsaUJBQUssRUFBRU47QUFEQztBQUZGO0FBREosT0FEYTtBQVNyQk8sY0FBUSxFQUFFO0FBQ1JDLHNCQUFjLEVBQUUsMEJBRFI7QUFFUkMsZUFBTyxFQUFFO0FBRkQsT0FUVztBQWFyQkMsY0FBUSxFQUFFO0FBYlcsS0FBdkI7QUFnQkEsU0FBS0MsYUFBTCxHQUFxQixJQUFJQyw4REFBSixDQUNuQlYsY0FEbUIsRUFFbkIsVUFBQVcsT0FBTyxFQUFJO0FBQ1RmLDhCQUF3QixDQUFDZ0IsSUFBekIsQ0FBOEJELE9BQU8sQ0FBQ0wsY0FBdEM7QUFDQVQsNkJBQXVCLENBQUNlLElBQXhCLENBQTZCRCxPQUFPLENBQUNKLE9BQXJDO0FBRUEvRSxPQUFDLENBQUMsTUFBRCxDQUFELENBQVVxRixjQUFWLENBQXlCLGNBQXpCO0FBRUFyRixPQUFDLENBQUMsWUFBRCxDQUFELENBQWdCc0YsT0FBaEIsQ0FDRTtBQUNFQyxpQkFBUyxFQUFFO0FBRGIsT0FERixFQUlFLEdBSkY7QUFNRCxLQWRrQixFQWVuQjtBQUNFQyw2QkFBdUIsRUFBRTtBQUN2QjlCLHVCQUFlLEVBQWZBLGVBRHVCO0FBRXZCRSx1QkFBZSxFQUFmQSxlQUZ1QjtBQUd2QkUsMEJBQWtCLEVBQWxCQSxrQkFIdUI7QUFJdkJFLDBCQUFrQixFQUFsQkEsa0JBSnVCO0FBS3ZCRSxzQkFBYyxFQUFkQTtBQUx1QjtBQUQzQixLQWZtQixDQUFyQjtBQXlCRCxHOzs7RUFsT21DdUIsZ0Q7Ozs7Ozs7Ozs7Ozs7OztBQ1J0QztBQUFBO0FBQUEsSUFBTUMsWUFBWSxHQUFHLGNBQXJCOztBQUNBLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBa0MsQ0FBQ0MsVUFBRDtBQUFBLFNBQWdCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFQLENBQVlGLFVBQVUsQ0FBQ0YsWUFBRCxDQUF0QixFQUFzQ3pGLE1BQXhEO0FBQUEsQ0FBeEM7O0FBQ0EsSUFBTThGLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsR0FBMkI7QUFDdEQsT0FBSyxJQUFJL0QsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxVQUFtQi9CLE1BQXZDLEVBQStDK0IsQ0FBQyxFQUFoRCxFQUFvRDtBQUNoRCxRQUFNNEQsVUFBVSxHQUFHMUUsSUFBSSxDQUFDOEUsS0FBTCxDQUE4QmhFLENBQTlCLDRCQUE4QkEsQ0FBOUIseUJBQThCQSxDQUE5QixFQUFuQjs7QUFDQSxRQUFJMkQsK0JBQStCLENBQUNDLFVBQUQsQ0FBbkMsRUFBaUQ7QUFDN0MsYUFBT0EsVUFBUDtBQUNIO0FBQ0o7QUFDSixDQVBEO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxJQUFNcEcsMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUE4QixDQUFDRixPQUFELEVBQWE7QUFDcEQsTUFBUTJHLHdCQUFSLEdBQXdHM0csT0FBeEcsQ0FBUTJHLHdCQUFSO0FBQUEsTUFBa0NDLGdDQUFsQyxHQUF3RzVHLE9BQXhHLENBQWtDNEcsZ0NBQWxDO0FBQUEsTUFBb0VDLCtCQUFwRSxHQUF3RzdHLE9BQXhHLENBQW9FNkcsK0JBQXBFO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdMLHNCQUFzQixDQUFDRSx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1YsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1hLGVBQWUsR0FBR1YsTUFBTSxDQUFDQyxJQUFQLENBQVlNLGdCQUFnQixDQUFDVixZQUFELENBQTVCLEVBQTRDYyxHQUE1QyxDQUFnRCxVQUFBQyxHQUFHO0FBQUEsV0FBSUEsR0FBRyxDQUFDQyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9KLGVBQWUsQ0FBQ0ssTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSixHQUFOLEVBQVd6RSxDQUFYLEVBQWlCO0FBQzNDNkUsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0osYUFBYSxDQUFDckUsQ0FBRCxDQUF4QjtBQUNBLFdBQU82RSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xyXG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSBcIi4vY2F0YWxvZ1wiO1xyXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gXCIuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzXCI7XHJcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gXCIuL2NvbW1vbi9mYWNldGVkLXNlYXJjaFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tIFwiLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlsc1wiO1xyXG5cclxuY29uc3QgQ0FSVF9BUEkgPSBcIi9hcGkvc3RvcmVmcm9udC9jYXJ0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XHJcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xyXG4gICAgJGVsZW1lbnQuYXR0cih7XHJcbiAgICAgIHJvbGU6IHJvbGVUeXBlLFxyXG4gICAgICBcImFyaWEtbGl2ZVwiOiBhcmlhTGl2ZVN0YXR1c1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xyXG4gICAgaWYgKCEkKFwiW2RhdGEtc2hvcC1ieS1wcmljZV1cIikubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgaWYgKCQoXCIubmF2TGlzdC1hY3Rpb25cIikuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikpIHtcclxuICAgICAgJChcImEubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlXCIpLmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcImEubmF2TGlzdC1hY3Rpb25cIikub24oXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxyXG4gICAgICAgICQoXCJzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlXCIpLFxyXG4gICAgICAgIFwic3RhdHVzXCIsXHJcbiAgICAgICAgXCJhc3NlcnRpdmVcIlxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25TaG93UHJvZHVjdFNlY29uZEltYWdlKGUpIHtcclxuICAgIGNvbnN0IGNhcmQgPSAkKGUuY3VycmVudFRhcmdldCkuZmluZChcIi5jYXJkLWltYWdlXCIpO1xyXG4gICAgY29uc3QgaW1hZ2UgPSBjYXJkLmF0dHIoXCJkYXRhLWhvdmVyaW1hZ2VcIik7XHJcbiAgICBjYXJkLmF0dHIoXCJzcmNzZXRcIiwgaW1hZ2UpO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVQcm9kdWN0U2Vjb25kSW1hZ2UoZSkge1xyXG4gICAgY29uc3QgY2FyZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5maW5kKFwiLmNhcmQtaW1hZ2VcIik7XHJcbiAgICBjb25zdCBpbWFnZSA9IGNhcmQuYXR0cihcImRhdGEtc3JjXCIpO1xyXG4gICAgY2FyZC5hdHRyKFwic3Jjc2V0XCIsIGltYWdlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNhcnQodXJsLCBpdGVtcykge1xyXG4gICAgY29uc3QgY2FydEl0ZW1zID0ge1xyXG4gICAgICBsaW5lSXRlbXM6IGl0ZW1zXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyk7XHJcblxyXG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keVxyXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FydCh1cmwpIHtcclxuICAgIHJldHVybiBmZXRjaCh1cmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiIH0pLnRoZW4oXHJcbiAgICAgIHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUNhcnRJdGVtcyh1cmwsIGNhcnRJZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3VybH0vJHtjYXJ0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIG9uQWRkQWxsVG9DYXJ0KCkge1xyXG4gICAgbGV0IHByb2R1Y3RzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHByb2R1Y3RzID0gW1xyXG4gICAgICAgIC4uLnByb2R1Y3RzLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1tpXS5xdHlfaW5fY2FydCArIDEsXHJcbiAgICAgICAgICBwcm9kdWN0SWQ6IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzW2ldLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jcmVhdGVDYXJ0KENBUlRfQVBJLCBwcm9kdWN0cylcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICAgJChcIi5hZGROb3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICAgJChcIi5yZW1vdmVOb3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJChcIi5hZGROb3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuICB9XHJcblxyXG4gIG9uUmVtb3ZlQWxsSXRlbXMoKSB7XHJcbiAgICB0aGlzLmdldENhcnQoXHJcbiAgICAgIGAke0NBUlRfQVBJfT9pbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyxsaW5lSXRlbXMucGh5c2ljYWxJdGVtcy5vcHRpb25zYFxyXG4gICAgKVxyXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuZGVsZXRlQ2FydEl0ZW1zKENBUlRfQVBJLCBkYXRhWzBdLmlkKSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICAkKFwiLmFkZE5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAgICQoXCIucmVtb3ZlTm90aWZpY2F0aW9uXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkKFwiLnJlbW92ZU5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG4gIH1cclxuXHJcbiAgb25DaGVja0NhcnQoKSB7XHJcbiAgICB0aGlzLmdldENhcnQoXHJcbiAgICAgIGAke0NBUlRfQVBJfT9pbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyxsaW5lSXRlbXMucGh5c2ljYWxJdGVtcy5vcHRpb25zYFxyXG4gICAgKVxyXG4gICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJChcIiNyZW1vdmVBbGxJdGVtc1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuICB9XHJcblxyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XHJcblxyXG4gICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKFwiY2xpY2tcIiwgZSA9PlxyXG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxyXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXHJcbiAgICAgICAgXCJzdGF0dXNcIixcclxuICAgICAgICBcInBvbGl0ZVwiXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XHJcblxyXG4gICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XHJcblxyXG4gICAgaWYgKCQoXCIjZmFjZXRlZFNlYXJjaFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XHJcbiAgICAgIGhvb2tzLm9uKFwic29ydEJ5LXN1Ym1pdHRlZFwiLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiYS5yZXNldC1idG5cIikub24oXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKFwic3Bhbi5yZXNldC1tZXNzYWdlXCIpLCBcInN0YXR1c1wiLCBcInBvbGl0ZVwiKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm9uQ2hlY2tDYXJ0KCk7XHJcbiAgICAkKFwiI2FkZEFsbFRvQ2FydFwiKS5vbihcImNsaWNrXCIsIHRoaXMub25BZGRBbGxUb0NhcnQuYmluZCh0aGlzKSk7XHJcbiAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vblJlbW92ZUFsbEl0ZW1zLmJpbmQodGhpcykpO1xyXG4gICAgJChcIi5jYXJkLWZpZ3VyZVwiKS5ob3ZlcihcclxuICAgICAgdGhpcy5vblNob3dQcm9kdWN0U2Vjb25kSW1hZ2UuYmluZCh0aGlzKSxcclxuICAgICAgdGhpcy5vblJlbW92ZVByb2R1Y3RTZWNvbmRJbWFnZS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcclxuICB9XHJcblxyXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xyXG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJChcIltkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl1cIik7XHJcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xyXG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxyXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxyXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXHJcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlXHJcbiAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcclxuICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoXCIjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXHJcbiAgICAgICAgICBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOiBcImNhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZ1wiLFxyXG4gICAgICAgIHNpZGViYXI6IFwiY2F0ZWdvcnkvc2lkZWJhclwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxyXG4gICAgICByZXF1ZXN0T3B0aW9ucyxcclxuICAgICAgY29udGVudCA9PiB7XHJcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XHJcbiAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xyXG5cclxuICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcclxuXHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgMTAwXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXHJcbiAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXHJcbiAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICBvbkludmFsaWRQcmljZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XHJcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcclxuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcclxuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxyXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcclxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XHJcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcclxuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xyXG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9