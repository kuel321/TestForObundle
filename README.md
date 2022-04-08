# TestForObundle
BigCommerce site created for interview test.



# Overview

Site Code: o86uidrdby
Site URL: https://lukeshortthemetest.mybigcommerce.com/?ctk=1e78abf1-5952-44ce-bbc9-e6de5c7d5950



First off, if anyone is having issues installing the Stencil CLI, make sure your Node version is 12. I used 12.13.0.

I was given a few tasks from Obundle to add some features to the base template called "Cornerstone" that BigCommerce offers. The features were simple to create, the only issues I had was figuring out where everything was and learning how to use the framework. 

Also, I removed all the other products for simplicity but kept the other catagories.

1. Create a product titled "Special Item" and a catagory titled "Special Items. 

This is done in the BigCommerce Products section of their website. It can be done in the API according to the docs but for time's sake I just used the site.

2. Add a feature that shows the product's secondary image when hovered

  ```
    $(".card-figure").hover(
      this.onShowProductSecondImage.bind(this),
      this.onRemoveProductSecondImage.bind(this)
    );
  ```
  
  Basic JS here. I'm pretty used to React so going back to Vanilla JS for stuff like this was interesting.
  
  3. Add "add all to cart" feature

  Assuming that only the "Special" item got the "add all to cart feature", I used an if statement to check if this item was labelled "special item" 
  
   ```
    {{#if category.name "===" "Special Items"}}
  ```
  
  And then 
  
   ```
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
  ```
  4. Include a "remove all items" feature

  I added a function that checked if there were any items in the cart, and if so, display the remove all items button.
  
  (BONUS)
  
  "Show user name and info"
  
  Using the Handlebars Customer Object, I used an if statement to check if there was a customer signed in and then displayed it. I only included the name so the header didn't look too crowded.
  
  
  
  
  
  
