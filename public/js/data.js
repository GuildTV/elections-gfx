var Data = [];

function findDataById(id){
  var win = typeof(id) === "string" && (id.substr(0,4) == "win-");
  if(win)
    id = id.substr(4);

  for(var i in Data){
    //check we have data
    if(Data[i] === undefined)
      continue;

    //find a role
    if(i == id)
      return Data[i];

    //foreach person
    for(var o in Data[i]){
      if(Data[i][o] !== undefined && Data[i][o].uid == id){
        var dat = Data[i][o];
        if(win)
          dat.elect = true;
        else 
          dat.elect = false;
        return dat;
      }
    }
  }
}
Data['sabbs'] = [
  {
    "uid"             : "sabbs-pres",
    "first"           : "Poppy",
    "last"            : "Wilkinson",
    "position"        : "President",
  },
  {
    "uid"             : "sabbs-vpad",
    "first"           : "Wadim",
    "last"            : "Wesolek",
    "position"        : "VP (Activities & Development)",
  },
  {
    "uid"             : "sabbs-vpdrs",
    "first"           : "Bethan",
    "last"            : "Dovey",
    "position"        : "VP (Democracy & Resources)",
  },
  {
    "uid"             : "sabbs-vpe",
    "first"           : "Joe",
    "last"            : "Armer",
    "position"        : "VP (Education)",
  },
  {
    "uid"             : "sabbs-vps",
    "first"           : "Molly",
    "last"            : "Browne",
    "position"        : "VP (Sport)",
  },
  {
    "uid"             : "sabbs-vpw",
    "first"           : "Frankie",
    "last"            : "Greenwell",
    "position"        : "VP (Welfare)",
  },
];

Data['talent'] = [
  {
    "uid"             : "talent-host",
    "first"           : "Claire",
    "last"            : "Lynch",
    "position"        : "Host",
  },
  {
    "uid"             : "talent-roving",
    "first"           : "Chloe",
    "last"            : "Rayner",
    "position"        : "Roving Reporter",
  },
  {
    "uid"             : "talent-anal",
    "first"           : "Jack Lockyer-Stevens & Lizzie Sharpe",
    "last"            : "",
    "position"        : "Political Commentators",
  },
];

Data['tweets'] = [
  {
    "uid": "572365211480420353",
    "text": "That's a wrap! Join @GuildTelevision tomorrow 10am live for more updates #GuildElections #Filming #TV #LoveYourGuild ",
    "img": "https://pbs.twimg.com/media/B_FzIF0XEAE5X9n.png",
    "created_at": "Wed Jun 06 20:07:10 +0000 2012",
    "username": "Suna Yokes",
    "profile_pic": "https://pbs.twimg.com/profile_images/559831721986637825/0iiDDnKq.jpeg",
  },
]
Data['ado'] = [
  {
    "uid"             : "ado-ben",
    "pid"             : "ado",
    "first"           : "Ben",
    "last"            : "Chapman",
    "position"        : "Activities & Development Officer",
    "position_short"  : "ADO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Introduce 'Society Of The Week'",
      "two"           : "Sponsorship and Networking",
      "three"         : "Vale Society Fair",
    }
  },
  {
    "uid"             : "ado-george",
    "pid"             : "ado",
    "first"           : "George",
    "last"            : "Hughes",
    "position"        : "Activities & Development Officer",
    "position_short"  : "ADO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Breaking Barriers for Committee Members",
      "two"           : "Student Recognition",
      "three"         : "Accessibility and Equality",
    }
  },
  {
    "uid"             : "ado-natalia",
    "pid"             : "ado",
    "first"           : "Natalia",
    "last"            : "Organova",
    "position"        : "Activities & Development Officer",
    "position_short"  : "ADO",
    "candidate"       : true,
  },
  {
    "uid"             : "ado-alex",
    "pid"             : "ado",
    "first"           : "Alexander",
    "last"            : "Moore",
    "position"        : "Activities & Development Officer",
    "position_short"  : "ADO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Better Publicity for Student Groups",
      "two"           : "Quicker and Easier Admin",
      "three"         : "More Ways to Improve Your SV Through Student Groups",
    }
  },
];

Data['arafo'] = [
  {
    "uid"             : "arafo-maaria",
    "pid"             : "arafo",
    "first"           : "Maaria",
    "last"            : "Ashraf",
    "position"        : "Anti-Racism, Anti Fascism Officer",
    "position_short"  : "ARAFO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Defeat Racism & Fascism on Campus",
      "two"           : "Embrace Diversity & Multiclturalism",
      "three"         : "Promoting Equality & Tolerance",
    }
  },
  {
    "uid"             : "arafo-katie",
    "pid"             : "arafo",
    "first"           : "Katie",
    "last"            : "Webb",
    "position"        : "Anti-Racism, Anti Fascism Officer",
    "position_short"  : "ARAFO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Eradication Intolerance",
      "two"           : "Educating About Diversity",
      "three"         : "Ensuring Saftey",
    }
  }
];

Data['cao'] = [
  {
    "uid"             : "cao-lewis",
    "pid"             : "cao",
    "first"           : "Lewis",
    "last"            : "Addlington-Lee",
    "position"        : "Community Action Officer",
    "position_short"  : "CAO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Work With Mind to Improve Support & Welfare for All Students & Staff",
      "two"           : "Create an Online Resourse Identifying Community Projects Near Students in Birmingham",
      "three"         : "Support the Student Movement in their Fight for Free & Accesible Education for All",
    }
  }
];

Data['dso'] = [
  {
    "uid"             : "dso-hayley",
    "pid"             : "dso",
    "first"           : "Hayley",
    "last"            : "Graham",
    "position"        : "Disabled Students' Officer",
    "position_short"  : "DSO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "To Incease Awareness of Disability Support Services & Network Available",
      "two"           : "To Continue the Campain Against Cuts to Disabled Students Allowance and Other Vital Funds",
      "three"         : "To Help Disable Studnts on Campus Make the Most of Life at Birmingham",
    }
  }
];

Data['eeo'] = [
  {
    "uid"             : "eeo-samuel",
    "pid"             : "eeo",
    "first"           : "Samuel",
    "last"            : "Benson",
    "position"        : "Ethical & Environmental Officer",
    "position_short"  : "EEO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Establish a Community Garden",
      "two"           : "Solar Panels on Campus",
      "three"         : "Campain for a More Eco-Efficient Selly Oak",
    }
  },
  {
    "uid"             : "eeo-james",
    "pid"             : "eeo",
    "first"           : "James",
    "last"            : "Honke",
    "position"        : "Ethical & Environmental Officer",
    "position_short"  : "EEO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Tackle Discrimination on Campus",
      "two"           : "Divest from Fossil Fuels",
      "three"         : "Fight for Living Wages & Free Education",
    }
  }
];

Data['emso'] = [
  {
    "uid"             : "emso-mohamed",
    "pid"             : "emso",
    "first"           : "Mohamed",
    "last"            : "Hussain",
    "position"        : "Ethnic Minority Students’ Officer",
    "position_short"  : "EMSO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Active Anti-Racist Campaigns on Campus & in the Community",
      "two"           : "Tackle the Attainment Gap: Diversify the Curriculum & Cahallenge Eurocentricity",
      "three"         : "Divers and inclusive Events & Projects for BME Students’",
    }
  },
  {
    "uid"             : "emso-hannah",
    "pid"             : "emso",
    "first"           : "Hannah",
    "last"            : "Sharron",
    "position"        : "Ethnic Minority Students’ Officer",
    "position_short"  : "EMSO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Representative",
      "two"           : "Accountable",
      "three"         : "Proactive",
    }
  }
];

Data['eo'] = [
  {
    "uid"             : "eo-joulie",
    "pid"             : "eo",
    "first"           : "Panagiota",
    "last"            : "Axelithioti",
    "position"        : "Education Officer",
    "position_short"  : "EO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "More Study Spaces that stay open longer",
      "two"           : "Fair Exams/Assignments & More Study Support",
      "three"         : "Better Student Experience for Home & International Students",
    }
  },
  {
    "uid"             : "eo-izzy",
    "pid"             : "eo",
    "first"           : "Isabella",
    "last"            : "Lenga",
    "position"        : "Education Officer",
    "position_short"  : "EO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Schedule Refresh",
      "two"           : "Study Spaces",
      "three"         : "Student Reps",
    }
  },
  {
    "uid"             : "eo-afroze",
    "pid"             : "eo",
    "first"           : "Afroze",
    "last"            : "Zaidi-Jivraj",
    "position"        : "Education Officer",
    "position_short"  : "EO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Closing The Attainment Gap",
      "two"           : "Free Education",
      "three"         : "Supporting Parent & Carers",
    }
  },
];

Data['hco'] = [
  {
    "uid"             : "hco-jacob",
    "pid"             : "hco",
    "first"           : "Jacob",
    "last"            : "Warner",
    "position"        : "Housing & Community Officer",
    "position_short"  : "HCO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "More Education on Housing Rights",
      "two"           : "Spare Room Platform",
      "three"         : "Improve Relatiionship Between Guild & Letting Agencies",
    }
  },
  {
    "uid"             : "hco-roberto",
    "pid"             : "hco",
    "first"           : "Roberto",
    "last"            : "Sorentino",
    "position"        : "Housing & Community Officer",
    "position_short"  : "HCO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Make Recycling More Accesible",
      "two"           : "Fight Crime in True Spiderman Fashion",
      "three"         : "Improve Wi-Fi Across Campus",
    }
  },
  {
    "uid"             : "hco-ciaran",
    "pid"             : "hco",
    "first"           : "Ciaran",
    "last"            : "Allanson-Campbell",
    "position"        : "Housing & Community Officer",
    "position_short"  : "HCO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Safer & Easier Househunting",
      "two"           : "Reacing Out to Future Students",
      "three"         : "Better & Safer Taxis",
    }
  },
];

Data['hso'] = [
  {
    "uid"             : "hso-adam",
    "pid"             : "hso",
    "first"           : "Adam",
    "last"            : "Elmi",
    "position"        : "Home Students’ Officer",
    "position_short"  : "HSO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Easier Access to Travel",
      "two"           : "Encourage Recording of Lecture",
      "three"         : "Increase Accessibility of Guild Council",
    }
  }
  ];

Data['iso'] = [
  {
    "uid"             : "iso-nivedita",
    "pid"             : "iso",
    "first"           : "Nivedita",
    "last"            : "Kulkarni",
    "position"        : "International Students' Officer",
    "position_short"  : "ISO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Improving the Services for International Students",
      "two"           : "Including More Cultural Events",
      "three"         : "Easier Ways to Voice Your Opinions",
    }
  },
  {
    "uid"             : "iso-khadijeh",
    "pid"             : "iso",
    "first"           : "Khadijeh",
    "last"            : "Rahmani",
    "position"        : "International Students' Officer",
    "position_short"  : "ISO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Represent International Students and Bring to the Table their Issues",
      "two"           : "Assist the Needs of International Students, Both Social & Academic",
      "three"         : "Make Sure their Voices are Heard in UoB",
    }
  },
  {
    "uid"             : "iso-abdul",
    "pid"             : "iso",
    "first"           : "Abdulmutalib",
    "last"            : "Shittu",
    "position"        : "International Students' Officer",
    "position_short"  : "ISO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Better Student Integration",
      "two"           : "Greater Awareness of International Students' Day",
      "three"         : "Better Information for Arriving/Present International Students",
    }
  }
];

Data['lgbtqo'] = [
  {
    "uid"             : "lgbtqo-chavonne",
    "pid"             : "lgbtqo",
    "first"           : "Chavonne",
    "last"            : "Brown",
    "position"        : "Lesbian, Gay, Bisexual, Trans and Queer Students’ Officer",
    "position_short"  : "LGBTQO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Raise the Profile of the LGBTQ Association",
      "two"           : "Raise Awareness of Those Groups Withing the Association that are Least Publically Understood",
      "three"         : "Promote Better Relations and Links with Liberation Associations",
    }
  }
];

Data['president'] = [
  {
    "uid"             : "pres-jack",
    "pid"             : "pres",
    "first"           : "Jack",
    "last"            : "Mably",
    "position"        : "Presidential",
    "position_short"  : "President",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Bigger, Better & Varied On Campus Events",
      "two"           : "Helping You Grab a Grad Job",
      "three"         : "Making Campus Work for You",
    }
  },
  {
    "uid"             : "pres-ed",
    "pid"             : "pres",
    "first"           : "Edward",
    "last"            : "Sainsbury",
    "position"        : "Presidential",
    "position_short"  : "President",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Extend 24 Hour Library",
      "two"           : "Secure Sponsorship For More Campus Events",
      "three"         : "Stronger Ties with Alumni",
    }
  },  
  {
    "uid"             : "pres-suleiman",
    "pid"             : "pres",
    "first"           : "Suleiman",
    "last"            : "Suleiman",
    "position"        : "Presidential",
    "position_short"  : "President",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "To provide a more conducive learning environment for all students",
      "two"           : "To provide more learning support especially for the international students.",
      "three"         : "To ensure equal representation for all students.",
    }
  },

];

Data['rro'] = [
  {
    "uid"             : "rro-ahmet",
    "pid"             : "rro",
    "first"           : "Ahmet",
    "last"            : "Aslim",
    "position"        : "Representation & Resources Officer",
    "position_short"  : "RRO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Transparency: Know What Your Guild is Doing",
      "two"           : "Democracy: More Polls and Student Meetings to Encourage Student Involvement in the Guild",
      "three"         : "Activities: More Trips Abroad, Games and Karaoke Nights",
    }
  },
  {
    "uid"             : "rro-ian",
    "pid"             : "rro",
    "first"           : "Ian",
    "last"            : "Kafka",
    "position"        : "Representation & Resources Officer",
    "position_short"  : "RRO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Communication: Improve Channels Between Students & Officers",
      "two"           : "Continuity: Ensure Effective Funcionality with New Systems Coming in to Force",
      "three"         : "Cash: Expand & Change Joe's Card to be Better at Saving you Money",
    }
  },
  {
    "uid"             : "rro-daisy",
    "pid"             : "rro",
    "first"           : "Daisy",
    "last"            : "Lindlar",
    "position"        : "Representation & Resources Officer",
    "position_short"  : "RRO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Make Gradball YOUR Gradball",
      "two"           : "Engage International Students",
      "three"         : "Reforem Guild Elections",
    }
  },
  {
    "uid"             : "rro-mohammed",
    "pid"             : "rro",
    "first"           : "Mohammed",
    "last"            : "Mumit",
    "position"        : "Representation & Resources Officer",
    "position_short"  : "RRO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Sustainable Living",
      "two"           : "Uniting Networks",
      "three"         : "Defend Democracy",
    }
  },
  {
    "uid"             : "rro-laurence",
    "pid"             : "rro",
    "first"           : "Laurence",
    "last"            : "Thompson",
    "position"        : "Representation & Resources Officer",
    "position_short"  : "RRO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Meal Plan in the Guild",
      "two"           : "A New Commercial Outlet, Chosen by Studetns",
      "three"         : "Guild Finances: Transparency and Control",
    }
  },
];

Data['so'] = [
  {
    "uid"             : "so-remy",
    "pid"             : "so",
    "first"           : "Remy",
    "last"            : "Claustres",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Big Scrowds for Big Games",
      "two"           : "Free Health and Fitness Classes",
      "three"         : "Intra Mural for All",
    }
  },
  {
    "uid"             : "so-evie",
    "pid"             : "so",
    "first"           : "Evangeline",
    "last"            : "Harrison",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Sports Centre Awarebess",
      "two"           : "'Best of Brum' Series",
      "three"         : "Shake It Up",
    }
  },
  {
    "uid"             : "so-luana",
    "pid"             : "so",
    "first"           : "Luana",
    "last"            : "Jordan",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Organise a Varsity Competiion Against Another Local University",
      "two"           : "Promote Sporting Events to Increase Attendance, Support & Recognition for All UoB Terms",
      "three"         : "Increase Awareness of Health and Fitness on Campus",
    }
  },
  {
    "uid"             : "so-becki",
    "pid"             : "so",
    "first"           : "Rebecca",
    "last"            : "McWhinnie",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Something for Everyone",
      "two"           : "Someone for Everyone",
      "three"         : "Somwhere for Everyone",
    }
  },
  {
    "uid"             : "so-tom",
    "pid"             : "so",
    "first"           : "Thomas",
    "last"            : "Mills",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Taking You From Hall Team Legend to Club Level Athlete",
      "two"           : "Sporting Skills to Pay the Bills",
      "three"         : "Take Your Marks and Get for the New Sports Centre",
    }
  },
  {
    "uid"             : "so-allan",
    "pid"             : "so",
    "first"           : "Allan",
    "last"            : "Stewart",
    "position"        : "Sports Officer",
    "position_short"  : "SO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Nutrition Matters",
      "two"           : "Sporting You",
      "three"         : "Active Campus",
    }
  },
];

Data['sso'] = [
  {
    "uid"             : "sso-ellie",
    "pid"             : "sso",
    "first"           : "Eleanor",
    "last"            : "Keiller",
    "position"        : "Satellite Sites Officer",
    "position_short"  : "SSO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Improved Transport Links",
      "two"           : "Sufficient Study Resources",
      "three"         : "Regular Guild Services",
    }
  }
  ];

Data['welfare'] = [
  {
    "uid"             : "welfare-ross",
    "pid"             : "welfare",
    "first"           : "Ross",
    "last"            : "Strong",
    "position"        : "Welfare Officer",
    "position_short"  : "WO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Mental Health Campaigning",
      "two"           : "Sexual Health Testing on Campus",
      "three"         : "Empowering Liberation Groups",
    }
  }
];

Data['womens'] = [
  {
    "uid"             : "womens-alex",
    "pid"             : "womens",
    "first"           : "Alexandra",
    "last"            : "Binnie",
    "position"        : "Womens's Officer",
    "position_short"  : "WO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Ensure Zero Tolerance Towards Incidents of Sexual Harassment on Campus, & Increase Visibility of Related Campaigns",
      "two"           : "Look to Extend Inclusivity of Trans Indivituals Across Campus",
      "three"         : "Work More Closely With Other Liberation Associations to Organise Events to Raise Awareness of Women's Issues",
    }
  },
  {
    "uid"             : "womens-zoe",
    "pid"             : "womens",
    "first"           : "Zoe",
    "last"            : "Salanitro",
    "position"        : "Womens's Officer",
    "position_short"  : "WO",
    "candidate"       : true,
    "manifestoPoints" : {
      "one"           : "Improve Welfare Support for Women and Non-Binary Students",
      "two"           : "Encourage Intersectional Feminism Through Working Wither Other Liberation Associations & Officers",
      "three"         : "Campaign Agaings Cuts for Free, Liberatory Education",
    }
  }
];
