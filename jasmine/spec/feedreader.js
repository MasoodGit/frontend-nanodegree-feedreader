/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* In this tests we test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* In this test , we test if all objects in allFeeds 
         * have the feed url defined and that its not empty.
         */
         it('have feed URL defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.trim().length).not.toBe(0);
            });
         });

        /* In this test , we test if all objects in allFeeds 
         * have the feed name defined and that its not empty.
         */
         it('have feed name defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.trim().length).not.toBe(0);
            });
         });

    });


    /* "The menu" test suite , contains tests  related to the menu in the 
     * application.
     */
    describe("The menu",function(){


        /* This test fixture tests if the menu element is
         * hidden by default.
         */
         it('is hidden by default',function(){
            var $body = $('body');
            var className = $body.hasClass('menu-hidden');
            expect(className).toBe(true);
         });

         /* This text fixture test if the menu changes
          * visibility when the menu icon is clicked. 
          */
          it('changes visibility when menu icons is clicked',function(){
             var $body = $('body');
             var $menu = $('.menu-icon-link');
             $menu.click();
             var className = $body.hasClass('menu-hidden');
             expect(className).toBe(false);

             $menu.click();
             className = $body.hasClass('menu-hidden');
             expect(className).toBe(true);

          });
    });

    /* " Initial Entries " test suite contains tests related to the initial number 
     * feeds that are loaded
     */
    describe("Initial Entries", function() {
        
        // call loadFeed for a particular feed.
        // pass done as loadFeed is async call
        beforeEach(function(done) {

            //load feeds for "CSS Tricks" (second entry in allFeeds array)
            // pass done as the callback function
            loadFeed(1,done)
        });

        /* This test ensures that loadFeed fetches the entries and that 
         * they are greater than zero and also 
         * these entries are part of the .feed container
         */
         it('should be greater than zero',function(done) {
            var numberOfEntries = $('.feed .entry').length;
            expect(numberOfEntries).toBeGreaterThan(0);
            done();
         });
    });

    /* "New Feed Selection" contains tests related to 
     * functionality which loads feeds based on the menu selection
     */
    describe("New Feed Selection", function() {
        
        var currentFeedEntries;
        
        beforeEach(function(done) {
            //save current feed entries
            currentFeedEntries = $('.feed .entry h2').text();
            //load feed entries for the dif category
            loadFeed(2,done);
        });

        /* This test fixture tests, if content actually changes
         * after new feed is loaded.
         */
        it('new feed loaded',function(done) {

            var newFeedEntries = $('.feed .entry h2').text();
            expect(currentFeedEntries).not.toBe(newFeedEntries);
            done();
        });

        //go back to earlier feed selection
        afterEach(function(done) {
            loadFeed(0,done);
        });
    });
    
}());
