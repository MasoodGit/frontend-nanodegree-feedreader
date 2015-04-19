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


    /* "The menu" , contains tests  related to the menu in the 
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

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(1,done)
        });
         
         it('should be greater than zero',function(done) {
            var numberOfEntries = $('.feed .entry').length;
            expect(numberOfEntries).toBeGreaterThan(0);
            done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var entryExists;
        beforeEach(function(done) {
            //check if existing feed has entries
            entryExists = $('.feed .entry h2').text();
            alert(entryExists);
            loadFeed(2,done)
        });

        it('new feed loaded',function(done) {
            var newEntry = $('.feed .entry h2').text();
            expect(entryExists).not.toBe(newEntry);
            done();
        });

        afterEach(function(done) {
            loadFeed(1,done);
        });
    });
    
}());
