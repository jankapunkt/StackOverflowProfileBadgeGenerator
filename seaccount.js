var stackUrlRoot = "https://api.stackexchange.com/2.2/users/";
var stackUrlTail = "?order=desc&sort=reputation&site=stackoverflow";

$(document).ready(function(){
	
});

function init( userName ){
	$(Account).on("loaded", function(event){
		Viewer.build( "#renderTarget", Account, null );
	});
	Account.load( "" );
	
}


/** REPRESENTS A STACK OVERFLOW ACCOUNT OBJECT **/
var Account = {

	//----------------------------------------------//
	// VAR
	//----------------------------------------------//
	items : null,
	
	getAllItems : function() {
		return this.items;
	},
	
	badge_counts : null,
	
	getAllBadges : function() {
		return this.badge_counts;
	},
	
	getGoldBadges : function(){
		return this.badge_counts.gold;
	},
	
	getSilverBadges : function(){
		return this.badge_counts.silver;
	},
	
	getBronzeBadges : function(){
		return this.badge_counts.bronze;
	},
	
	display_name : "" ,
	
	getName : function() {
		return this.display_name;
	},
	
	account_id : "" ,
	
	getAccountId : function(){
		return this.account_id;
	},
	
	user_id : "",
	
	getUserId : function(){
		return this.user_id;
	},
	
	profile_image : "" ,
	
	getProfileImage : function(){
		return this.profile_image;
	},
	
	location : "" ,
	
	getLocation : function(){
		return this.location;
	},
	
	link : "",
	
	getProfileUrl : function(){
		return this.link;
	},
	
	website_url : "" ,
	
	getWebsiteUrl : function(){
		return this.website_url;
	},
	
	creation_date : "",
	
	getIsMemberSince : function(){
		return this.creation_date;
	},
	
	last_modified_date : "",
	
	getLastModified : function(){
		return this.last_modified_date;
	},
	
	last_access_date : "",
	
	getLastAccessed : function(){
		return this.last_access_date;
	},
	
	reputation : "",
	
	getReputation : function(){
		return this.reputation;
	},
	
	reputation_change_year : "",
	
	getReputationYear : function(){
		return this.reputation_change_year;
	},
	
	reputation_change_quarter : "",
	
	getReputationQuarter : function(){
		return this.reputation_change_quarter;
	},
	
	reputation_change_month : "",
	
	getReputationMonth : function(){
		return this.reputation_change_month;
	},
	
	reputation_change_week : "",
	
	getReputationWeek : function(){
		return this.reputation_change_week;
	},
	
	reputation_change_day : "",
	
	getReputationDay : function(){
		return this.reputation_change_day;
	},
	
	//----------------------------------------------//
	// LOAD
	//----------------------------------------------//
	
	load : function( user ){
		var request = 
		stackUrlRoot + "3098783" + stackUrlTail; //replace with user
		$.getJSON( request , this.processData );
		
	},
	
	//----------------------------------------------//
	// PROCESS
	//----------------------------------------------//
	processData : function( data ){
		this.items = data.items[0];
		this.badge_counts = this.items.badge_counts;
		console.log("Account.processData: "+ data);
		$.each(this.items, function(key,value){
			//console.log(key+" : " + value);
			if (Account.hasOwnProperty(key))
				Account[key] = value;
			else
				console.log("key not found: "+key);
		});
	
		$.each(Account.badge_counts, function(key,value){
			console.log(key+" : " + value);
		});
		$(Account).trigger("loaded");
	}
}

var DisplayDef = {
	_form : null,
	
	getForm : function() {
		if (this._form == null) {
			this._form = $('inputForm');
		}
		return this._form;
	},
	
	showName : function(){
		return this.getForm().display_name.value == "1";
	},
	
	showAccountId : function() {
		return this.getForm().account_id.value == "1";
	},
	
	showUerId : function() {
		return this.getForm().user_id.value == "1";
	},
	
	showBadges : function() {
		
	}
	
}


var Viewer = {
	
	build : function( target , source, displayDef ){
		console.log("Viewer.build");
		
		
		
		var root = $('<div />');
			root.attr('id', 'stackProfileDisplay');

		
		//if (displayDef.showName)
		root.append( this.addName(source.getName()) );
		root.append(this.addAccountId(source.getAccountId()));
		root.append(this.addUserId(source.getUserId()));
		root.append(this.addProfileImage(source.getProfileImage()));
		root.append(this.addBadges(source.getBronzeBadges(), source.getSilverBadges(), source.getGoldBadges()));
		
		$(target).html( $(root).html() );
	},
	
	addName : function(name) {
		var $name = $('<div />');
			$name.attr('id', 'profileName');
			$name.attr('class', 'profileName defaultText');
			$name.text( name );
		return $name;
	},
	
	addAccountId : function(accountid){
		var $accId = $('<div />');
			$accId.attr('id', 'accountId');
			$accId.attr('class', 'accoundId defaultText');
			$accId.text(accountid);
		return $accId;
	},
	
	addUserId : function(userid){
		var $userId = $('<div />');
			$userId.attr('id', 'userId');
			$userId.attr('class', 'userId defaultText');
			$userId.text(userid);
		return $userId;
	},
	
	addProfileImage : function(imageUrl){
		var $img = $('<img />');
			$img.attr('id', 'profileImage');
			$img.attr('class', 'profileImage');
			$img.attr('src', imageUrl);
		return $img;
	},
	
	addBadges : function( bronze, silver, gold) {
		var $badges = $("<ul></ul>");
			$badges.attr('id', 'badges');
			$badges.attr('class', 'badges defaultText');
		
		var $gold = $("<li></li>");
			$gold.attr('id', 'badgesGold');
			$gold.attr('class', 'badges defaultText');
			$gold.text(gold);
		
		var $silver = $("<li></li>");
			$silver.attr('id', 'badgesSilver');
			$silver.attr('class', 'badges defaultText');
			$silver.text(silver);
					
		var $bronze = $("<li></li>");
			$bronze.attr('id', 'badgesBronze');
			$bronze.attr('class', 'badges defaultText');
			$bronze.text(bronze);
		
		$badges.append($gold);
		$badges.append($silver);
		$badges.append($bronze);
		
		return $badges;
	}
	
}


function can(obj, methodName)
{
     return obj != null && ((typeof obj[methodName]) == "function");
}

function has(obj, property)
{
	return obj != null && obj.hasOwnProperty(property);
}