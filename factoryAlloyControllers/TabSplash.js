
$.thumbnail.image = "cat/IMG_001.png";

/*
<Button id="installButton">Add</Button>
$.installButton.addEventListener('click', function(_e) {
 	var addFugitiveController = Alloy.createController('AnimalAdd');
    $.TabHome.open(addFugitiveController.getView());
});
*/

$.installCatButton.addEventListener('click', function(_e) {
	
	var animalList = [	
		{
			name : "Scarlet Ibis",
            sciName: "Eudocimus ruber",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_001.png",
            notes:"Prefers swampy habitats such as mud flats and shallow bays.  Tends to reproduce and nest on on dense brush - covered islands and mangroves. \nHas a colonial and social breeding system with egg-laying taking place between November and December.  There are usually 3 to 5 eggs in each nest. \nForages for food by either probing in water with its long bill or pecking for prey items on soil surfaces.  Main diet consists of crustaceans and aquatic invertebrate, also frogs, molluscs, small snakes and small fish.\nRange: Trinidad, Northern South America, from Venezuela to Eastern Brazil.",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Ocelot",
            sciName: "Leopardus pardalis",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_002.png",
            notes:"Inhabit a variety of different habitats ranging from dense thorn scrub to tropical forests.  Also known to live in mountainous regions.\nIn the tropics breeding takes place year round,  especially September to November.  Gestation period varies between 79 and 85 days with litter sizes usually only 1 or 2 young.\nPrimarily nocturnal cats,, ocelots are generally solitary animals.  Persue prey primarily on the ground ranging from many small to medium-sized mammals and birds.  Also eat amphibians, fish, and reptiles.\nRange: Trinidad, Mexico, Central america and northern South Americas",
            captured : true,
           	url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Black-Throated Mango",
            sciName: "Anthracothorax nigricollo nigrtcolas", // ?
            status:"protected",
            localThumbnailImageReference:"cat/IMG_003.png",
            notes:"Inhabits open country, cultivation and gardens.\nBreed almost year-round.  A tiny cup nest is built on a thin, high and usually bare branch.   The female lays and incubates two white eggs,  Incubation period is 16 to 17 days.\nFeeds on nectar often taken from the flowers of large trees.  Also feeds on flying insects\nThis bird produces a sharp chick sound.\nRange:  Trinidad and Tobago, Panama, Northeastern Bolivia, Southern Brazil and Northern Argentina.",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Ruby Topaz Hummingbird",
            sciName: "Chrysolampiz mosquitus",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_023.png",
            notes:"Inhabits open country, and cultivation and gardens.\nFemales lay two eggs in a tiny cup nest in the fork of a low branch.  Incubation period is 16 days.\nFeeds on nectar from a wide variety of flowers.  Also feeds on some small insects.\nThis hummingbird measures 9cm in length and weighs about 3.5g.\nThe call is a high-pitched tsip\nRange:  Trinidad and Tobago,  The Lesser Antilles, Columbia, Venezuela and the Guyanas, Central Brazil, Norhtern Bolivia and Southern Panama.",
            captured : true,
            url : "string",
            capturedLat : 12,
           	capturedLong : 345
		},
		{
			name: "Golden-Headed Manakin",
            sciName: "Pipra erythrocephala",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_024.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Collared Peccary, Quenk",
            sciName: "Tayassu tajacu",
            status:"protected",
           	localThumbnailImageReference:"cat/IMG_022.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Wild Muscovy Duck",
            sciName: "Cairina moschata",
           	status:"protected",
            localThumbnailImageReference:"cat/IMG_019.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Red-eared Slider",
            sciName: "Trachemys scripta elegans",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_014.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Prehensile-tailed Porcupine",
            sciName: "Coendou prehensilis",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_011.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Crested Bobwhite",
           	sciName: "Colinus cristatus",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_015.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
           	capturedLong : 345
		},
		{
			name: "Grey Seedeater, Picoplat",
            sciName: "Sporophila intermedia",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_005.png",
            notes:"string",
            captured : true,
           	url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Bay headed tanager",
            sciName: "Tanagra gyrola",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_025.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Green Honeycreeper",
            sciName: "Chlorophanes spiza",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_021.png",
            notes:"Found in Second Growth forests with large trees.  Breeding recorded from May to July.  The Female builds a small cup nest",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Tayra",
            sciName: "Eira barbara",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_007.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Crab-eating Raccon",
            sciName: "Procyon cancrivorus",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_008.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Purple Honeycreeper",
            sciName: "Cyanerpes caeruleus",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_001.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Caribbean Flamingo",
            sciName: "Phoenicopterus ruber",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_001.png",
            notes:"string",
            captured : true,
            url : "string",
            capturedLat : 12,
            capturedLong : 345
		},
		{
			name : "Capybara",
            sciName: "Hydrochaeris hydrochaeris",
            status:"protected",
            localThumbnailImageReference:"cat/IMG_001.png", //?
            notes:"string",
            captured : true,
           	url : "string",
            capturedLat : 12,
            capturedLong : 345
		}		
	];//end animalList
 	 
	for (var i = 0; i < animalList.length; i++) {
 	 	
 	 	Ti.API.info(" installing Animal " + i + " : " + animalList[i].name );
	 	var animalModel = Alloy.createModel("Animal", {
			name : animalList[i].name,
			sciName :animalList[i].sciName,
			status: animalList[i].status,
	        localThumbnailImageReference: animalList[i].localThumbnailImageReference,
			notes :animalList[i].notes,
			captured : animalList[i].captured,
			url: animalList[i].url,
			capturedLat : animalList[i].capturedLat,
			capturedLong : animalList[i].capturedLong
		});
		animalModel.save();	
		
	}//end for loop
	
	Ti.App.fireEvent('update_table');
	
});

