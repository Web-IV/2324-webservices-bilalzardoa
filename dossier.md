# Bilal Zardoa (Studentennummer)

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak uit dit document.
> Lees <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet> om te weten hoe een Markdown-bestand opgemaakt moet worden.
> Verwijder alle instructies (lijnen die starten met >).

- [ ] Web Services:
  - <GITHUB_REPO_LINK_HIER>
  - <LINK_ONLINE_VERSIE_HIER>

**Logingegevens**

- Gebruikersnaam: admin
- Wachtwoord: admin12345

## Projectbeschrijving

mijn app is een geestelijke gezondheid tracker. De gebruiker logt zijn activiteiten en schrijft in een dagelijks dagboek en met deze gegevens word er advies gegeven op basis van de relatie tussen de activiteit en dagboek (advies nog niet geimplementeerd). EERD => 


## API calls

### users

- `GET /api/user/users`: alle gebruikers ophalen
- `GET /api/user/count`: aantal gebruikers ophalen
- `GET /api/user/:id`: gebruiker met een bepaald id ophalen
- `GET /api/user/email/:email`: gebruiker met een bepaald email ophalen
- `GET /api/user/username/:username`: gebruiker met een bepaald username ophalen

- `POST /api/user/login`: gebruiker kan inloggen
- `POST /api/user/register`: gebruiker kan registreren

- `DELETE /api/user/delete/:id`: gebruiker kan zichzelf verwijderen met zijn/haar id

### journal

- `GET /api/journal/add`: journal entry toevoegen 
- `PUT /api/journal/:journalId`: journal entry bijwerken
- `GET /api/journal/user/:userId`: journal entry van een bepaalde gebruiker opvragen met userId
- `GET /api/journal/:journalId`: journal entry opvragen adhv journalId

- `DELETE /api/journal/:journalId`: journal entry verwijderen 


### activity

- `GET /api/activity/add`: activity entry toevoegen 
- `PUT /api/activity/:activityId`: activity entry bijwerken
- `GET /api/activity/user/:userId`: activity entry van een bepaalde gebruiker opvragen met userId
- `GET /api/activity/:activityId`: activity entry opvragen adhv journalId

- `DELETE /api/activity/:activityId`: activity entry verwijderen 


## Behaalde minimumvereisten

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel, 2 een-op-veel of veel-op-veel relaties)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties - indien van toepassing
  - [x] heeft seeds
<br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
<br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bvb tussentabellen)
  - [x] degelijke authorisatie/authenticatie op alle routes
<br />

- **algemeen**

  - [x] er is een minimum aan logging voorzien
  - [x] een aantal niet-triviale integratietesten (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier en voldoende commits

## Projectstructuur

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

In de root hebben we een _tests_ folder , config folder en andere nodige bestanden.
De applicatie zit in de "app" folder met daarin de volgende mappen: "src" > "core" , "data","repository","rest","service". Applicatie word gestart in de index.js bestand dat gebruikt maakt van CreateServer.js  .

## Extra technologie

### Web Services


Als extra technologie heb ik gebruik gemaakt van passport.js voor authenticatie.Passport.js maakt gebruik van JWT's om gebruiker informatie op te halen en adhv van passport strategies na te kijken of de JWT van de gebruiker authorisatie heeft.

link naar de npm package =>  https://www.npmjs.com/package/passport

## Testresultaten

### Web Services

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen + voeg een screenshot van de coverage en uitvoering toe

## Gekende bugs

### Web Services

> Zijn er gekende bugs?

