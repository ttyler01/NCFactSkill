'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================
//

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.71b22b77-1ace-49a2-ac7c-f64fed4152ad";

var SKILL_NAME = "North Carolina Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "You can say tell me a north carolina fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================

var data = [
    "Babe Ruth hit his first home run in Fayetteville on March 7th 1914.",
    "The Venus Fly Trap, is only found in two American states, NC and SC, but is native to Hampstead, NC.",
    "Cape Hatteras is the largest lighthouse to ever be moved due to erosion.",
    "North Carolina is the largest producer of sweet potatoes in the nation. There has even been a petition to make the sweet potato the official state vegetable.",
    "Whitewater Falls, located in Transylvania County, is the highest waterfall in the eastern region of the country.",
    "At 6,684 ft. Mt. Mitchell is the highest peak east of the Mississippi.",
    "Cherry Point, in Havelock, is the largest air base in the marine corps.",
    "At 480 ft. high, Fontana Dam is the tallest dam in the Eastern United States.",
    "The first mini-golf, or Putt Putt course, was built in Fayetteville.",
    "The Stanly–Spaight Duel was the most notorious affair of honor in North Carolina history.  The duel occured on the evening of September 5, 1802 and at the time was part of the southern culture of honor, which compelled elite men to attach life-or-death importance to their reputations.",
    "Big Butt is a trail on the western side of the state near the Blue Ridge Parkway and Asheville. It has some outstanding views.",
    "Old world North Carolina is Tom Thumbs, or Dan Doodles, which are ground pork sausages that are stuffed in the large intestines of pigs and hickory smoked for a day until they are nearly mahogany.",
    "UNC Chapel Hill is the oldest state university in the United States.",
    "Many people believe North Carolina became the first colony to declare independence from Great Britain with the Mecklenburg Declaration of 1775.",
    "Grandfather Mountain, is the only private park in the world designated by the U.N as an International Biosphere Reserve.",
    "North Carolina leads the nation in furniture, tobacco, brick, and textile production.",
    "Virginia Dare was the first English child born on American soil.",
    "The islands off the North Carolina coast practically have their own language known as the High Tider dialect.",
    "In 1961, two nuclear bombs 260 times more powerful than the bomb dropped on Hiroshima were accidentally dropped over Goldsboro, N.C.",
    "North Carolina is the “Moonshine Capital of the World” gave birth to NASCAR.",
    "The Vanderbilt mansion is America’s largest private home and is located in Asheville.",
    "Whynot is a small town in Randolph County North Carolina.  Why not check it out sometime?",
    "The first powered flight by the Wright brothers happened at Kitty Hawk.",
    "The North Carolina state motto is Esse Quam Videri - To Be, Rather Than To Seem",
    "The first English settlement in the New World was in NC - The Lost Colony that no one knows what happened to!",
    "From Manteo in the east to Murphy in the west, North Carolina is 560 miles long, making it the longest state east of the Mississippi.",
    "NC boasts the most outdoor dramas of any state, we also had the first outdoor drama - The Lost Colony that details the first English settlement",
    "Pepsi Cola was invented in North Carolina 100 years ago in 1898",
    "Spanning 112,000 acres along North Carolina's northern border, The Great Dismal swamp is SO spooky and mysterious it inspired a Harriet Beecher Stowe novel.",
    "Grove Park Inn near Asheville North Carolina is haunted by the Pink Lady, a good-natured ghost that takes kindly to children.",
    "The Devil's Tramping ground near Bear Creek North Carolina is a 40-foot diameter circle completely absent of life. Nothing will grow within the circle, and anything left within the circle will be thrown out the next day.",
    "The Brown Mountain Lights are a series of ghost lights reported near Brown Mountain in North Carolina. The lights can be seen from the Blue Ridge Parkway at mile posts 310 and 301 and from the Brown Mountain Overlook on NC Highway 181.  Legend holds the lights to be 'ghost maidens' searching for their loved ones after a great battle of The Cherokee and Catawba.",
    "NC was the last state to secede from the Union during the Civil War",
    "North Carolina has the best Barbeque in the United States",
    "Jockey's Ridge is the tallest natural sand dune system in the Eastern United States. Depending on the weather, its height can range from 80 to 100 feet!",
    "Albemarle Sound along the coastal areas of North Carolina is the largest freshwater sound in the world.",
    "Belmont Abbey was the first abbey cathedral in the Western Hemisphere",
    "The first English colony in America was located on Roanoke Island. Walter Raleigh founded it. The colony mysteriously vanished with no trace except for the word Croatoan scrawled on a nearby tree.",
    "In 1629 King Charles the First granted territory to Sir Robert Heath, who named it Carolina after the king.",
    "Colony of Swiss and German Protestants founded New Bern, which is North Carolina’s second oldest town.",
    "The town of New Bern was named after the city of Berne, Switzerland.",
    "North Carolina is nicknamed the Tar Heel State",
    "The first English child born in America was born in Roanoke, now in North Carolina, in 1587. Her name was Virginia Dare.",
    "High Point North Carolina is known as the Furniture Capital of the World.",
    "Whitewater Falls in Transylvania County is the highest waterfall in the eastern United States.",
    "Krispy Kreme Doughnut was founded in Winston-Salem.",
    "The Biltmore Estate in Ashville is America's largest home, and includes a 255-room chateau, an award-winning winery, and extensive gardens.",
    "Hiram Rhoades Revels, born in Fayetteville in 1822, was the first African-American member of the United States Congress.",
    "Michael Jordan always wore his University of North Carolina shorts under his NBA Bulls uniform for good luck.",
    "Asheville, North Carolina, is a mecca for craft beer lovers and boasts the largest number of breweries per capita of any city in the United States.",
    "North Carolina’s state song is The Old North State",
    "In Asheville, North Carolina it is illegal to sneeze on city streets.",
    "In North Carolina Organizations may not hold their meetings while the members present are in costume",
    "Dellview, North Carolina is North Carolina’s smallest municipality, and is considered to be one of America’s tiniest incorporated towns. It had only 13 residents as of 2010.",
    "North Carolina’s Outer Banks are beautiful for tourists, but deadly for sailors. The region is nicknamed “The Graveyard of the Atlantic” thanks to a series of sandbars and strong currents that have sent countless ships to a watery grave.",
    "North Carolina’s coast was a favorite stomping ground for the infamous pirate Blackbeard.",
    "On November 21, 1789, North Carolina became the 12th state to join the Union",
    "North Carolina produces between 15 and 20 percent of the nation's live Christmas trees, including the popular North Carolina Fraser fir",
    "On average, North Carolina is hit by a hurricane every 3.44 years and Raleigh's professional ice hockey team is called the Carolina Hurricanes.",
    "In prehistoric times the eastern half of North Carolina was underwater. Giant megalodon sharks roamed the waters and on land there were woolly mammoths and mastodons.",
    "Giovanni de Varrazano was the first European to visit North Carolina in 1524.",
    "In 1730, Virginian William Byrd wrote that 'the inhabitants of North Carolina devour so much swine’s flesh, that it fills them full of gross humours.'",
    "In North Carolina, 'barbecue' is a noun. It is never used by native Tar Heels to describe the act of cooking barbecue.",
    "North Carolina barbecue is cooked very slowly -- often as long as overnight -- over pieces of hardwood that have been burned down to coals.  Oak and hickory are among the most frequently used woods.",
    "Mount Airy North Carolina is the town that Andy Griffith modeled his Mayberry TV town after.",
    "Chang and Eng Bunker were famous conjoined twins that eventually settled in Mount Airy to start families.",
    "Korner's Folly is an historic home built by Jule Gilmer Korner. Located in Kernersville, NC it is considered by many as the Strangest Home in America",
    "The Cameron Barnstormer Murals are antique barns in Cameron North Carolina with wild and artistic paintings on their sides.",
    "The Blue Ghost Fireflies of North Carolina are lightning bugs that glow blue-white instead of flashing yellow-green.",
    "The House of Mugs in Collettsville North Carolina is a cabin entirely convered with coffee mugs.",
    "The Duke Lemur Center in Durham North Carolina is a research center for rare prosimians and is studying how they sleep to help prolong human life.",
    "Point Harbor North Carolina is home of the World's Largest Hammock, woven from over 10,000 feet of rope and spanning 42 feet.",
    "Some of the filming locations for the movie Dirty Dancing are in and around Lake Lure, which is the lake where Johnny Castle taught Baby to lift.",
    "Sylva North Carolina is home to the American Museum of the House Cat and includes a petrified cat rescued from a 16th century English fireplace.",
    "The Grove Park Inn in Ashville North Carolina is the U.S. Supreme Court's secret Cold War relocation facility",
    "Rose Hill North Carolina boasts the world's largest operational frying pan, frying up to 365 whole chickens each year during the North Carolina Poultry Jubilee.",
    "North Carolina's 12th Congressional District was formerly the most gerrymandered district in the United States.",
    "The abandoned Henry River Mill Village served as the filmsite for District 12 in the the movie The Hunger Games.",
    "Near Hillsborough North Carolina is the Shangri-La Stone Village, a miniture village built from concrete, stone, and thousands of arrowheads by Henry L. Warren.",
    "Helen's Bridge, near Asheville, is said to be haunted by the ghost of a distraught mother.",
    "Know as Fish Town in the early 1700's when Blackbeard frequented the North Carolina coast, Beaufort Town was established as a seaport with the right to collect customs in 1722.",
    "Whitewater Falls in Transylvania County is the highest waterfall in the eastern United States.",
    "Harker's Island North Carolina hosts the annual Core Sound Decoy Festival in December.",
    "Morehead City is home to the North Carolina Seafood Festival, held the first weekend in October every year.",
    "Winston-Salem North Carolina was created when the two towns Winston and Salem combined.",
    "The Mile-High Swinging Bridge near Linville is 5,305 feet above sea level. The bridge actually hangs about 80 feet above the ground.",
    "Beech Mountain North Carolina is Eastern America's highest town at 5,506ft above sea level.",
    "Andrew Jackson, seventh President of the United States, was born in the Waxsaws area on the border of North and South Carolina.",
    "James K. Polk, born in Mecklenburg County, North Carolina, was the eleventh President of the United States.",
    "Hiram Rhoades Revels, born in Fayetteville in 1822, was the first African-American member of the United States Congress.",
    "Andrew Johnson started his career as a tailor's apprentice in Raleigh, North Carolina and rose to lead in the reuniting of the nation as the seventeenth President of the United States.",
    "Saluda, North Carolina is located at the top of the Saluda Grade. The crest of the steepest standard gauge mainline railroad in the United States.",
    "North Carolina has the largest state-maintained highway system in the United States. The state's highway system currently has 77,400 miles of roads",
    "The oldest town in the state of North Carolina is Bath, incorporated in 1705.",
    "North Carolina has 1,500 lakes of 10 acres or more in size and 37,000 miles of fresh water streams.",
    "The Lost Colony Outdoor Drama in Albemarle commemorates the birth of Virginia Dare. Scheduled to run just one year, it proved so successful that it has played for nearly sixty consecutive summers.",
    "The World War II battleship 'North Carolina' is permanently berthed on the Cape Fear River at Wilmington. She was saved from the scrap heap in the 1960's by public subscription, including donations of dimes by schoolchildren.",
    "The University of North Carolina's mascot, the Tarheels, is a nickname for North Carolinians that supposedly came from the days when NC produced a lot of tar, and someone saw a set of footprints made by someone who had stepped in the tar.",
    "In 2001 North Carolina designated the Blueberry the Official State blue berry and the Strawberry the Official State red berry.",
    "In 1995 the Sweet Potato was named the Official North Carolina State Vegetable.",
    "North Carolina designated the Scotch bonnet as the official state shell in 1965. North Carolina was the first state to adopt a seashell symbol.",
    "North Carolina designated the Carolina lily as the official State wildflower in 2003. The flower petals are brilliant red-orange with brown spots and curl back to overlap.",
    "Official State Dog of North Carolina is the Plott Hound.  The Plott hound is one of only four breeds known to be of American origin and are described as the ninja warriors of dogdom.",
    "North Carolina designated stock car racing as the official state sport in 2011. North Carolina is the home of the stock car racing NASCAR Hall of Fame and the NC Auto Racing Hall of Fame.",
    "In 1987 Milk was named the Official State Beverage of North Carolina.",
    "North Carolina designated the northern cardinal as official state bird in 1943.",
    "North Carolina designated the Shad boat as the official state historical boat in 1987. The Shad boat is a small sailing craft ideal for maneuvering shallow water and rapidly-changing weather conditions along the coast.",
    "The blossom of the dogwood tree was designated as the official state flower of North Carolina in 1941. The Dogwood is one of the most common trees in North Carolina.",
    "The pine tree was designated as the official state tree of North Carolina in 1963. Eight types of pine tree are considered indigenous to North Carolina, including the eastern white pine, loblolly pine, longleaf pine, pitch pine, pond pine, shortleaf pine, table mountain pine, and Virginia pine.",
    "In 2013 North Carolina designated the fossilized teeth of the megalodon shark as the official state fossil. The megalodon shark may have reached over 40 feet in length and weighed up to 100 tons",
    "In 2013 North Carolina designated the Pine Barrens treefrog as the official state frog of North Carolina. The rare Pine Barrens treefrog can be found in the Sandhills and Coastal Plain regions of North Carolina.",
    "In 2010 North Carlina designated the Colonial Spanish Mustang as the official state horse after numerous requests from the students of Shawboro Elementary School in Currituck County.  Although nearly extinct the few remaining populations roam the Out Banks arround Corolla, North Carolina",
    "In 1973 the Honeybee was adopted as the Official State Insect of North Carolina.",
    "North Carolina designated the Virginia opossom as the official state marsupial in 2013. The Virginia opossum is native to North Carolina and is the only marsupial found in North America",
    "The Eastern box turtle was designated as the official state reptile of North Carolina in 1979.  Eastern box turtles can live to be over 100 years old.",
    "In 1971 the Channel Bass or Red Drum was designated the Official State Saltwater Fish of North Carolina.",
    "In 1969 North Carolina designated the Grey Squirrel the Official State Mammal.",
    "In 2005 the Venus Flytrap was designated the North Carolina Official State Carnivorous Plant.",
    "Lexington, North Carolina, is known as the Barbecue Capital of the World, and October was officially declared 'Barbecue Month' with a month long Annual Barbecue Festival.",
    "The North Carolina Annual Barbecue Festival has a Parade of Pigs on bicycles also called the Tour de Pig!",
    "Lexington North Carolina is famous for its barbecue. The city's first barbecue restaurant opened in 1919.",
    "Eastern Carolina Barbeque Sauce is traditionally a mixture of water, vinegar, salt, and pepper.",
    "Although not in North Carolina, South Carolina has a town called North, South Carolina.",
    "The last Shell Oil clamshell station is located in Winston-Salem on the quiet corner of Sprague and Peachtree Streets.",
    "North Carolina has an Annual Livermush Festival.  Livermush is traditionally made from pig liver, head parts, cornmeal, pepper and sage. The mixture is made into a loaf and fried.",
    "The Scuppernong, a large muscadine grape, is the Official Fruit of North Carolina.  The name comes from the Scuppernong River in North Carolina traces traces back to the Algonquian word ascopo meaning sweet bay tree.",
    "According to the North Carolina Department of Commerce, the oldest cultivated grapevine in the country is the Mothervine in Manteo on Roanoke Island, North Carolina, a 400 year old Scuppernong vine.",
    "North Carolina was the first state to establish a state museum of art and a state symphony."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

