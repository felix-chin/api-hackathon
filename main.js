let teamSelected = null;
let teams = [];
let players = [];
let matches = [];
let allMatches = [];
let matchReports= [];
let match1HomeTeam = '';
let match1AwayTeam = '';
let match2HomeTeam = '';
let match2AwayTeam = '';
let match3HomeTeam = '';
let match3AwayTeam = '';
let match4HomeTeam = '';
let match4AwayTeam = '';
let match1HomeScore = null;
let match1AwayScore = null;
let match2HomeScore = null;
let match2AwayScore = null;
let match3HomeScore = null;
let match3AwayScore = null;
let match4HomeScore = null;
let match4AwayScore = null;
let match1Date = null;
let match2Date = null;
let match3Date = null;
let match4Date = null;
let matchVideo = null;
const date = new Date();
const currentDate = new Date(date.getTime() - (12*60*60*1000) - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
const chooseTeamHeading = document.querySelector('.choose-team-heading');
const teamLogos = document.querySelector('.team-logos-wrapper');
const playersTable = document.querySelector('.players-table');
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const detailsHeader = document.querySelector('.details-header');
const teamDetails = document.querySelector('.team-details');
const team = document.querySelector('.team-name');
const stadium = document.querySelector('.venue-name');
const website = document.querySelector('.website');
const detailsTeamLogo = document.querySelector('.details-team-logo');
const homeButton = document.querySelector('.home-button');
const match1Home = document.querySelector('.match1Home');
const match1Away = document.querySelector('.match1Away');
const match2Home = document.querySelector('.match2Home');
const match2Away = document.querySelector('.match2Away');
const match3Home = document.querySelector('.match3Home');
const match3Away = document.querySelector('.match3Away');
const match4Home = document.querySelector('.match4Home');
const match4Away = document.querySelector('.match4Away');
const loader = document.querySelector('.loading-screen');
const matchResults = document.querySelector('.match-results');
const highlights = document.querySelector('.highlights');
const closeButton = document.querySelector('.close-button');
const iframe = document.querySelector('iframe');
const tryAgainModal = document.querySelector('.try-again');
const tryAgainButton = document.querySelector('.try-again-btn');
const menuBar = document.querySelector('.menu-bar');
const articleGroup = document.querySelector('.article-group');

menuBar.addEventListener('click', onMenuBarClick)
teamLogos.addEventListener('click', onLogoClick);
homeButton.addEventListener('click', reset);
matchResults.addEventListener('click', getHighlights);
closeButton.addEventListener('click', () => {
  highlights.classList.add('d-none');
  iframe.src = 'about:blank';
})
tryAgainButton.addEventListener('click', () => {
  start();
  tryAgainModal.classList.add('d-none');
  loader.classList.remove('d-none');
})

start();

function start() {
  getTeams();
  getAllMatches();
}

function onMenuBarClick(event) {
  if (event.target.getAttribute('id') === 'news') {

  }
}

function onLogoClick(event) {
  loader.classList.remove('d-none');
  const element = event.target;
  if(!element.hasAttribute('data-team')) {
    return;
  }
  teamSelected = element.getAttribute('data-team');
  matches = allMatches.filter(
    match => match['awayTeam'].id === teams[teamSelected].id || match['homeTeam'].id === teams[teamSelected].id
  )
  displayClubHeader();
  getMatchResults();
  getPlayers(teams[teamSelected]['id']);
}

function getHighlights(event) {
  const element = event.target;
  if (!element.hasAttribute('data-video')) {
    return;
  }
  highlights.classList.remove('d-none');
  matchVideo = element.getAttribute('data-video');
  if(matchVideo === '1') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match1HomeTeam + '%' + match1AwayTeam + '%2020';
  } else if (matchVideo === '2') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match2HomeTeam + '%' + match2AwayTeam + '%2020';
  } else if (matchVideo === '3') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match3HomeTeam + '%' + match3AwayTeam + '%2020';
  } else if (matchVideo === '4') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match4HomeTeam + '%' + match4AwayTeam + '%2020';
  }
}

function displayClubHeader() {
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  team.textContent = teams[teamSelected].name;
  stadium.textContent = teams[teamSelected].venue;
  website.textContent = teams[teamSelected].website;
  website.setAttribute('href', teams[teamSelected].website);
  detailsTeamLogo.classList.add(teams[teamSelected].tla);
  teamDetails.classList.remove('d-none');
  detailsHeader.classList.remove('d-none');
}

function reset() {
  homeHeader.classList.remove('d-none');
  homePage.classList.remove('d-none');
  teamDetails.classList.add('d-none');
  detailsHeader.classList.add('d-none');
  detailsTeamLogo.classList.remove(teams[teamSelected].tla);
  match1Home.style.color = '';
  match1Home.style.fontWeight = '';
  match1Away.style.color = '';
  match1Away.style.fontWeight = '';
  match2Home.style.color = '';
  match2Home.style.fontWeight = '';
  match2Away.style.color = '';
  match2Away.style.fontWeight = '';
  match3Home.style.color = '';
  match3Home.style.fontWeight = '';
  match3Away.style.color = '';
  match3Away.style.fontWeight = '';
  match4Home.style.color = '';
  match4Home.style.fontWeight = '';
  match4Away.style.color = '';
  match4Away.style.fontWeight = '';
  matchReports = [];
  players = [];
  playersTable.innerHTML = '';
}

function getMatchInfo() {
  for (let i = 0; i < teams.length; i++) {
    if (matches[matches.length - 1]['homeTeam']['id'] === teams[i]['id']) {
      match1HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 1]['awayTeam']['id'] === teams[i]['id']) {
      match1AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 2]['homeTeam']['id'] === teams[i]['id']) {
      match2HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 2]['awayTeam']['id'] === teams[i]['id']) {
      match2AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 3]['homeTeam']['id'] === teams[i]['id']) {
      match3HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 3]['awayTeam']['id'] === teams[i]['id']) {
      match3AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 4]['homeTeam']['id'] === teams[i]['id']) {
      match4HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 4]['awayTeam']['id'] === teams[i]['id']) {
      match4AwayTeam = teams[i]['shortName'];
    }
  }
  match1Date = matches[matches.length - 1]['utcDate'].slice(0, matches[matches.length - 1]['utcDate'].indexOf('T'));
  match2Date = matches[matches.length - 2]['utcDate'].slice(0, matches[matches.length - 2]['utcDate'].indexOf('T'));
  match3Date = matches[matches.length - 3]['utcDate'].slice(0, matches[matches.length - 3]['utcDate'].indexOf('T'));
  match4Date = matches[matches.length - 4]['utcDate'].slice(0, matches[matches.length - 4]['utcDate'].indexOf('T'));
  getNewsArticle();
}


function colorScore() {
  if(match1HomeScore > match1AwayScore) {
    match1Home.style.color = '#E4B222';
    match1Home.style.fontWeight = 'bold';
  } else if (match1AwayScore > match1HomeScore) {
    match1Away.style.color = '#E4B222';
    match1Away.style.fontWeight = 'bold';
  } else if (match1AwayScore === match1HomeScore) {
    match1Away.style.fontWeight = 'bold';
    match1Home.style.fontWeight = 'bold';
  }
  if (match2HomeScore > match2AwayScore) {
    match2Home.style.color = '#E4B222';
    match2Home.style.fontWeight = 'bold';
  } else if (match2AwayScore > match2HomeScore) {
    match2Away.style.color = '#E4B222';
    match2Away.style.fontWeight = 'bold';
  } else if (match2AwayScore === match2HomeScore) {
    match2Away.style.fontWeight = 'bold';
    match2Home.style.fontWeight = 'bold';
  }
  if (match3HomeScore > match3AwayScore) {
    match3Home.style.color = '#E4B222';
    match3Home.style.fontWeight = 'bold';
  } else if (match3AwayScore > match3HomeScore) {
    match3Away.style.color = '#E4B222';
    match3Away.style.fontWeight = 'bold';
  } else if (match3AwayScore === match3HomeScore) {
    match3Away.style.fontWeight = 'bold';
    match3Home.style.fontWeight = 'bold';
  }
  if (match4HomeScore > match4AwayScore) {
    match4Home.style.color = '#E4B222';
    match4Home.style.fontWeight = 'bold';
  } else if (match4AwayScore > match4HomeScore) {
    match4Away.style.color = '#E4B222';
    match4Away.style.fontWeight = 'bold';
  } else if (match4AwayScore === match4HomeScore) {
    match4Away.style.fontWeight = 'bold';
    match4Home.style.fontWeight = 'bold';
  }
}

function getMatchResults() {
  match1HomeScore = matches[matches.length - 1]['score']['fullTime']['homeTeam'];
  match1AwayScore = matches[matches.length - 1]['score']['fullTime']['awayTeam'];
  match2HomeScore = matches[matches.length - 2]['score']['fullTime']['homeTeam'];
  match2AwayScore = matches[matches.length - 2]['score']['fullTime']['awayTeam'];
  match3HomeScore = matches[matches.length - 3]['score']['fullTime']['homeTeam'];
  match3AwayScore = matches[matches.length - 3]['score']['fullTime']['awayTeam'];
  match4HomeScore = matches[matches.length - 4]['score']['fullTime']['homeTeam'];
  match4AwayScore = matches[matches.length - 4]['score']['fullTime']['awayTeam'];
  getMatchInfo();
  colorScore();
  match1Home.textContent = `${match1HomeTeam} ${match1HomeScore}`;
  match1Away.textContent = `${match1AwayScore} ${match1AwayTeam}`;
  match2Home.textContent = `${match2HomeTeam} ${match2HomeScore}`;
  match2Away.textContent = `${match2AwayScore} ${match2AwayTeam}`;
  match3Home.textContent = `${match3HomeTeam} ${match3HomeScore}`;
  match3Away.textContent = `${match3AwayScore} ${match3AwayTeam}`;
  match4Home.textContent = `${match4HomeTeam} ${match4HomeScore}`;
  match4Away.textContent = `${match4AwayScore} ${match4AwayTeam}`;
}

function handleGetError(error) {
  console.error(error);
  tryAgainModal.classList.remove('d-none');
  loader.classList.add('d-none');
}

function renderTeams(teams) {
  teams.forEach((team, i) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.className = 'col-sm-2 col-3 team-logo';
    img.setAttribute('src', team.crestUrl);
    img.setAttribute('data-team', i);
    div.appendChild(img);
    teamLogos.firstElementChild.appendChild(div);
  })
}

function handleGetPlayersSuccess(data) {
  players = data.squad;
  players.forEach(player => {
    if (player.role === 'PLAYER') {
      const row = document.createElement('tr');
      const name = document.createElement('td');
      const pos = document.createElement('td');
      const nat = document.createElement('td');
      name.textContent = player.name;
      pos.textContent = player.position;
      nat.textContent = player.nationality;
      row.append(pos, nat, name);
      playersTable.appendChild(row);
    }
  })
}

function getPlayers(team) {
  $.ajax({
    method: "GET",
    url: `https://api.football-data.org/v2/teams/${team}`,
    headers: {
      "X-Auth-Token": "2e33b10247bd4841be2fec54f309863c"
    },
    error: handleGetError,
    success: handleGetPlayersSuccess
  })
}

function handleGetTeamsSuccess(data) {
  teams = data.teams;
  renderTeams(teams);
  teams[0].tag = 'arsenal';
  teams[1].tag = 'aston-villa';
  teams[2].tag = 'chelsea';
  teams[3].tag = 'everton';
  teams[4].tag = 'liverpool';
  teams[5].tag = 'manchestercity';
  teams[6].tag = 'manchester-united';
  teams[7].tag = 'newcastleunited';
  teams[8].tag = 'norwichcity';
  teams[9].tag = 'tottenham-hotspur';
  teams[10].tag = 'wolves';
  teams[11].tag = 'burnley';
  teams[12].tag = 'leicestercity';
  teams[13].tag = 'southampton';
  teams[14].tag = 'watford';
  teams[15].tag = 'crystalpalace';
  teams[16].tag = 'sheffieldunited';
  teams[17].tag = 'brightonfootball';
  teams[18].tag = 'westhamunited';
  teams[19].tag = 'bournemouth';
}

function getTeams() {
  $.ajax({
    method: "GET",
    url: "https://api.football-data.org/v2/competitions/2021/teams",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    error: handleGetError,
    success: handleGetTeamsSuccess
  })
}

function handleGetAllMatchesSuccess(data) {
  allMatches = data.matches;
  loader.classList.add('d-none');
  chooseTeamHeading.classList.add('animate-fade-in');
  teamLogos.classList.add('animate-bottom');
}

function getAllMatches() {
  $.ajax({
    method: "GET",
    url: "https://api.football-data.org/v2/competitions/2021/matches",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    data: {
      "season": "2019"
    },
    error: handleGetError,
    success: handleGetAllMatchesSuccess
  })
}

function renderMatchReports() {
  matchReports.forEach(report => {
    const div = document.createElement('div');
    const anchor = document.createElement('a');
    const text = report.webTitle;
    const link = report.webUrl;
    anchor.textContent = text;
    anchor.setAttribute('href', link);
    anchor.setAttribute('target', '_blank');
    div.append(anchor);
    articleGroup.append(div);
  })
  loader.classList.add('d-none');
}

function handleGetNewsArticleSuccess (data) {
  matchReports = data.response.results;
  renderMatchReports();
}

function getNewsArticle() {
  $.ajax({
    method: "GET",
    url: "https://content.guardianapis.com/search",
    data: {
      "api-key": "a8d15746-592e-4adf-96a5-171b4d3e254c",
      "q": teams[teamSelected].name,
      "order-by": 'newest'
    },
    error: handleGetError,
    success: handleGetNewsArticleSuccess
  })
}

// function initMap() {
//   const map = new google.maps.Map(
//     document.getElementById('map'), {
//       zoom: 15,
//       gestureHandling: 'cooperative'
//     });
//   const geocoder = new google.maps.Geocoder();
//   geocodeAddress(geocoder, map);
// }

// function geocodeAddress(geocoder, resultsMap) {
//   const address = teams[teamSelected]["address"];
//   geocoder.geocode({ 'address': address }, function (results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     }
//   });
// }
