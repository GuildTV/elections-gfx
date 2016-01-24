var Data = [];

function findDataById(id){
  for(var i in Data){
    //check we have data
    if(Data[i] === undefined)
      continue;

    //find a role
    if(i == id)
      return Data[i];



    //foreach person
    for(var o in Data[i].people){
      var person = Data[i].people[o];

      if(person !== undefined && person.uid == id){
        
        person.position = Data[i].info;

        return person;
      }
    }
  }
}

function xmlToObject(str){
  var data = {};

  var xml = (new DOMParser()).parseFromString(str,"text/xml");
  var components = xml.querySelectorAll('componentData');

  for(var i=0; i < components.length; i++){
    var node = components[i];
    var id = node.getAttribute('id');

    data[id] = node.querySelector('#text').getAttribute('value');
  }

  return data;
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

Data['tweet'] = {
  "uid": "572365211480420353",
  "text": "HUGE congratulations to the new officer team for 15/16. I'm so excited to pass on all I've learned. You will be incredible #guildelections",
  "img": "https://pbs.twimg.com/media/B_FzIF0XEAE5X9n.png",
  "created_at": "Wed Jun 06 20:07:10 +0000 2012",
  "username": "Daisey Lindlar",
  "handle": "Guild_Represent"
};
Data['ado'] = {
  info: {
    full: "Activities & Development Officer",
    compact:  "Activities & Development", // sidebar title etc
    mini: "ADO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "ado-ben",
      "pid"             : "ado",
      "first"           : "Ben",
      "last"            : "Chapman",
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
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    },
    {
      "uid"             : "ado-alex",
      "pid"             : "ado",
      "first"           : "Alexander",
      "last"            : "Moore",
      "manifestoPoints" : {
        "one"           : "Better Publicity for Student Groups",
        "two"           : "Quicker and Easier Admin",
        "three"         : "More Ways to Improve Your SV Through Student Groups",
      }
    },
    {
      "uid"             : "ado-ron",
      "pid"             : "ado",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['arafo'] = {
  info: {
    full: "Anti-Racism, Anti Fascism Officer",
    compact:  "Anti-Racism, Anti Fascism", // sidebar title etc
    mini: "ARAFO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "arafo-maaria",
      "pid"             : "arafo",
      "first"           : "Maaria",
      "last"            : "Ashraf",
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
      "manifestoPoints" : {
        "one"           : "Eradication Intolerance",
        "two"           : "Educating About Diversity",
        "three"         : "Ensuring Saftey",
      }
    },
    {
      "uid"             : "arafo-ron",
      "pid"             : "arafo",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};
Data['cao'] = {
  info: {
    full: "Community Action Officer",
    compact:  "Community Action", // sidebar title etc
    mini: "CAO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "cao-lewis",
      "pid"             : "cao",
      "first"           : "Lewis",
      "last"            : "Addlington-Lee",
      "manifestoPoints" : {
        "one"           : "Work With Mind to Improve Support & Welfare for All Students & Staff",
        "two"           : "Create an Online Resourse Identifying Community Projects Near Students in Birmingham",
        "three"         : "Support the Student Movement in their Fight for Free & Accesible Education for All",
      }
    },
    {
      "uid"             : "cao-ron",
      "pid"             : "cao",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};
Data['dso'] = {
  info: {
    full: "Disabled Students' Officer",
    compact:  "Disabled Students'", // sidebar title etc
    mini: "DSO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "dso-hayley",
      "pid"             : "dso",
      "first"           : "Hayley",
      "last"            : "Graham",
      "manifestoPoints" : {
        "one"           : "To Incease Awareness of Disability Support Services & Network Available",
        "two"           : "To Continue the Campain Against Cuts to Disabled Students Allowance and Other Vital Funds",
        "three"         : "To Help Disable Studnts on Campus Make the Most of Life at Birmingham",
      }
    },
    {
      "uid"             : "dso-ron",
      "pid"             : "dso",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['eeo'] = {
  info: {
    full: "Ethical & Environmental Officer",
    compact:  "Ethical & Environmental", // sidebar title etc
    mini: "EEO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "eeo-samuel",
      "pid"             : "eeo",
      "first"           : "Samuel",
      "last"            : "Benson",
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
      "manifestoPoints" : {
        "one"           : "Tackle Discrimination on Campus",
        "two"           : "Divest from Fossil Fuels",
        "three"         : "Fight for Living Wages & Free Education",
      }
    },
    {
      "uid"             : "eeo-ron",
      "pid"             : "eeo",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['emso'] = {
  info: {
    full: "Ethnic Minority Students’ Officer",
    compact:  "Ethnic Minority Students’", // sidebar title etc
    mini: "EMSO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "emso-mohamed",
      "pid"             : "emso",
      "first"           : "Mohamed",
      "last"            : "Hussain",
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
      "manifestoPoints" : {
        "one"           : "Representative",
        "two"           : "Accountable",
        "three"         : "Proactive",
      }
    },
    {
      "uid"             : "emso-ron",
      "pid"             : "emso",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};
Data['eo'] = {
  info: {
    full: "Education Officer",
    compact:  "Education", // sidebar title etc
    mini: "EO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "eo-joulie",
      "pid"             : "eo",
      "first"           : "Panagiota",
      "last"            : "Axelithioti",
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
      "manifestoPoints" : {
        "one"           : "Closing The Attainment Gap",
        "two"           : "Free Education",
        "three"         : "Supporting Parent & Carers",
      }
    },
    {
      "uid"             : "eo-ron",
      "pid"             : "eo",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['hco'] = {
  info: {
    full: "Housing & Community Officer",
    compact:  "Housing & Community", // sidebar title etc
    mini: "HCO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "hco-jacob",
      "pid"             : "hco",
      "first"           : "Jacob",
      "last"            : "Warner",
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
      "manifestoPoints" : {
        "one"           : "Safer & Easier Househunting",
        "two"           : "Reacing Out to Future Students",
        "three"         : "Better & Safer Taxis",
      }
    },
    {
      "uid"             : "hco-ron",
      "pid"             : "hco",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['hso'] = {
  info: {
    full: "Home Students’ Officer",
    compact:  "Home Students’", // sidebar title etc
    mini: "HSO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "hso-adam",
      "pid"             : "hso",
      "first"           : "Adam",
      "last"            : "Elmi",
      "manifestoPoints" : {
        "one"           : "Easier Access to Travel",
        "two"           : "Encourage Recording of Lecture",
        "three"         : "Increase Accessibility of Guild Council",
      }
    },
    {
      "uid"             : "hso-ron",
      "pid"             : "hso",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['iso'] = {
  info: {
    full: "International Students' Officer",
    compact:  "International Students'", // sidebar title etc
    mini: "ISO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "iso-nivedita",
      "pid"             : "iso",
      "first"           : "Nivedita",
      "last"            : "Kulkarni",
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
      "manifestoPoints" : {
        "one"           : "Better Student Integration",
        "two"           : "Greater Awareness of International Students' Day",
        "three"         : "Better Information for Arriving/Present International Students",
      }
    },
    {
      "uid"             : "iso-ron",
      "pid"             : "iso",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['lgbtqo'] = {
  info: {
    full: "Lesbian, Gay, Bisexual, Trans and Queer Students’ Officer",
    compact:  "LGBTQ Students’", // sidebar title etc
    mini: "LGBTQSO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "lgbtqo-chavonne",
      "pid"             : "lgbtqo",
      "first"           : "Chavonne",
      "last"            : "Brown",
      "manifestoPoints" : {
        "one"           : "Raise the Profile of the LGBTQ Association",
        "two"           : "Raise Awareness of Those Groups Within the Association that are Least Publically Understood",
        "three"         : "Promote Better Relations and Links with Liberation Associations",
      }
    },
    {
      "uid"             : "lgbtqo-ron",
      "pid"             : "lgbtqo",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
}

Data['president'] = {
  info: {
    full: "President",
    compact:  "Presidential", // sidebar title etc
    mini: "President",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "pres-jack",
      "pid"             : "pres",
      "first"           : "Jack",
      "last"            : "Mably",
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
      "manifestoPoints" : {
        "one"           : "To provide a more conducive learning environment for all students",
        "two"           : "To provide more learning support especially for the international students.",
        "three"         : "To ensure equal representation for all students.",
      }
    },
    {
      "uid"             : "pres-ron",
      "pid"             : "pres",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['rro'] = {
  info: {
    full: "Representation & Resources Officer",
    compact:  "Representation & Resources", // sidebar title etc
    mini: "RRO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "rro-ahmet",
      "pid"             : "rro",
      "first"           : "Ahmet",
      "last"            : "Aslim",
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
      "manifestoPoints" : {
        "one"           : "Meal Plan in the Guild",
        "two"           : "A New Commercial Outlet, Chosen by Studetns",
        "three"         : "Guild Finances: Transparency and Control",
      }
    },
    {
      "uid"             : "rro-ron",
      "pid"             : "rro",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['so'] = {
  info: {
    full: "Sports Officer",
    compact:  "Sports", // sidebar title etc
    mini: "SO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "so-remy",
      "pid"             : "so",
      "first"           : "Remy",
      "last"            : "Claustres",
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
      "manifestoPoints" : {
        "one"           : "Nutrition Matters",
        "two"           : "Sporting You",
        "three"         : "Active Campus",
      }
    },
    {
      "uid"             : "so-ron",
      "pid"             : "so",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['sso'] = {
  info: {
    full: "Satellite Sites Officer",
    compact:  "Satellite Sites", // sidebar title etc
    mini: "SSO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "sso-ellie",
      "pid"             : "sso",
      "first"           : "Eleanor",
      "last"            : "Keiller",
      "manifestoPoints" : {
        "one"           : "Improved Transport Links",
        "two"           : "Sufficient Study Resources",
        "three"         : "Regular Guild Services",
      }
    },
    {
      "uid"             : "sso-ron",
      "pid"             : "sso",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['welfare'] = {
  info: {
    full: "Welfare Officer",
    compact:  "Welfare", // sidebar title etc
    mini: "WO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "welfare-ross",
      "pid"             : "welfare",
      "first"           : "Ross",
      "last"            : "Strong",
      "manifestoPoints" : {
        "one"           : "Mental Health Campaigning",
        "two"           : "Sexual Health Testing on Campus",
        "three"         : "Empowering Liberation Groups",
      }
    },
    {
      "uid"             : "welfare-ron",
      "pid"             : "welfare",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};

Data['womens'] = {
  info: {
    full: "Womens' Officer",
    compact:  "Womens'", // sidebar title etc
    mini: "WO",
    sidebar_use_officer: false // include officer when showing in sidebar
  },

  people: [
    {
      "uid"             : "womens-alex",
      "pid"             : "womens",
      "first"           : "Alexandra",
      "last"            : "Binnie",
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
      "manifestoPoints" : {
        "one"           : "Improve Welfare Support for Women and Non-Binary Students",
        "two"           : "Encourage Intersectional Feminism Through Working Wither Other Liberation Associations & Officers",
        "three"         : "Campaign Agaings Cuts for Free, Liberatory Education",
      }
    },
    {
      "uid"             : "womens-ron",
      "pid"             : "womens",
      "first"           : "RON",
      "last"            : "",
      "manifestoPoints" : {
        "one"           : "",
        "two"           : "",
        "three"         : "",
      }
    }
  ]
};
