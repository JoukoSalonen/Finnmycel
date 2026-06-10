export type ProductSize = {
  weight: string
  price: number
}

export type Product = {
  id: string
  name: string
  subtitle: string
  shortDesc: string
  description: string
  cultivation: string
  culinary: string
  storage: string
  sizes: ProductSize[]
  category: 'tuore' | 'kuivattu' | 'jalostettu'
  badge?: string
  inStock: boolean
  slug: string
  images: { src: string; alt: string }[]
  tags: string[]
  vatPercent: number
  price?: number
  unit?: string
}

export type Post = {
  id: string
  date: string
  title: string
  body: string
  author: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sitruunavinokas',
    subtitle: 'Tuore · Pleurotus citrinopileatus',
    shortDesc: 'Kirkkaan keltainen, hedelmäinen aromi. Silmäänpistävin vinokkaamme.',
    description: 'Sitruunavinokas on vinokkasperheemme värikkäin jäsen – kirkkaan auringonkeltaiset lakki tekevät siitä pöydässä välittömän huomion herättäjän. Maku on miedompi kuin väri antaa ymmärtää: hieman hedelmäinen, pähkinäinen, erittäin mieto. Sopii erinomaisesti paistamiseen, wokkaukseen ja koristeluun.',
    cultivation: 'Kasvatamme sitruunavinokkaan vehnän oljella Säynätsalossa. Korjaamme sienet aamuisin juuri ennen kuin lakit alkavat avautua – tässä vaiheessa aromi ja rakenne ovat parhaimmillaan.',
    culinary: 'Paista kuumalla pannulla voissa tai öljyssä 2–3 minuuttia. Älä ylitäytä pannua – sienet ruskistuvat kauniin kullanruskeiksi kun ne saavat tilaa. Toimii loistavasti pastassa, risotossa, wokissa ja koristeena keitoissa. Väri haalistuu kypsennettäessä – se on täysin normaalia.',
    storage: 'Säilyy jääkaapissa n. 5–7 vrk. Säilytä paperipussissa tai avonaisessa rasiassa – älä sulje ilmatiiviisti.',
    sizes: [
      { weight: '150g', price: 3.30 },
      { weight: '350g', price: 6.40 },
      { weight: '1,5 kg', price: 30.00 },
    ],
    category: 'tuore',
    badge: 'Uutuus',
    inStock: true,
    slug: 'sitruunavinokas',
    images: [
      { src: '/yellow-hero.jpg', alt: 'Sitruunavinokas – tiheä keltainen terttu' },
      { src: '/yellow-warm.jpg', alt: 'Sitruunavinokas – lakit lähikuvassa' },
      { src: '/yellow-plate.jpg', alt: 'Sitruunavinokas sinisellä alustalla' },
      { src: '/yellow-bag.jpg', alt: 'Sitruunavinokas kasvamassa tilalla' },
      { src: '/yellow-early.jpg', alt: 'Sitruunavinokas varhaisvaiheessa' },
    ],
    tags: ['gluteeniton', 'vegaaninen', 'kotimainen', 'tuore'],
    vatPercent: 13.5,
  },
  {
    id: '2',
    name: 'Vaaleanpunainen vinokas',
    subtitle: 'Tuore · Pleurotus djamor',
    shortDesc: 'Pehmeän roosa, silkkinen rakenne. Harvinainen herkku suoraan tilalta.',
    description: 'Vaaleanpunainen vinokas on visuaalisesti yksi maailman kauneimmista viljelysienistä. Ruusunpunainen väri ja silkkisen pehmeä rakenne tekevät siitä sekä silmänruoan että gourmet-elämyksen. Maku on miedompi kuin muilla vinokkaillamme – hieman makea, erittäin mieto umami.',
    cultivation: 'Kasvatamme vaaleanpunaisen vinokkaan vehnän oljella lämpimässä kasvatushallissamme. Laji viihtyy hieman muita vinokkaita lämpimämmässä – optimilämpötila on 20–28 astetta. Satokausi on rajallinen, joten tilaa ajoissa.',
    culinary: 'Paista nopeasti kuumalla pannulla – 1–2 minuuttia riittää. Pitkä kypsennys hajottaa rakenteen. Loistava pastassa, kananmunaruoissa ja keittojen koristeena. Väri vaihtelee kypsennettäessä kellertäväksi – täysin normaalia.',
    storage: 'Säilyy jääkaapissa n. 5 vrk. Herkkä sieni – säilytä paperipussissa, käytä mahdollisimman pian.',
    sizes: [
      { weight: '150g', price: 3.30 },
      { weight: '350g', price: 6.40 },
      { weight: '1,5 kg', price: 30.00 },
    ],
    category: 'tuore',
    badge: 'Harvinainen',
    inStock: true,
    slug: 'vaaleanpunainen-vinokas',
    images: [
      { src: '/pink-hero.jpg', alt: 'Vaaleanpunainen vinokas – korallinen terttu' },
      { src: '/pink-grow.jpg', alt: 'Vaaleanpunainen vinokas kasvamassa tilalla' },
      { src: '/pink-gills.jpg', alt: 'Vaaleanpunainen vinokas – helottavat itiölamellit' },
      { src: '/pink-farm.jpg', alt: 'Vaaleanpunainen vinokas kasvatushyllyssä' },
    ],
    tags: ['gluteeniton', 'vegaaninen', 'kotimainen', 'harvinainen', 'tuore'],
    vatPercent: 13.5,
  },
  {
    id: '3',
    name: 'Black Pearl -vinokas',
    subtitle: 'Tuore · Pleurotus hybrid',
    shortDesc: 'Tummanharmaat, kiiltävät lakit ja tiivis rakenne. Paras grillattavaksi.',
    description: 'Black Pearl on erikoisvinokas, joka yhdistää kuningasvinokkaan (P. eryngii) lihakkauden ja tavallisen vinokkaan herkkyyden. Tummanharmaat, lähes mustat lakit ja paksut valkoiset jalat tekevät siitä keittiön draamakuningattaren. Maku on täyteläisempi ja umamirikkaampi kuin muilla vinokkaillamme.',
    cultivation: 'Black Pearl vaatii tarkan lämpötilan ja kosteuden – kasvatamme sitä erillisessä kasvatussolussa optimiolosuhteissa. Satoerät ovat pieniä, laatu tasainen. Jalat ovat yhtä hyvää syötävää kuin lakit.',
    culinary: 'Tämä on grillaajan sieni. Leikkaa isommiksi paloiksi, sivele öljyllä ja grillaa 4–5 minuuttia per puoli. Saa kauniin paistopinnan ja pitää muotonsa. Toimii myös pannulla, uunissa tai ramen-keiton täytteenä. Ei tarvitse marinoida – umami on jo valmiina.',
    storage: 'Säilyy jääkaapissa n. 7–10 vrk. Tiiviimpirakenteinen kuin muut vinokkaat – kestää käsittelyä hyvin.',
    sizes: [
      { weight: '150g', price: 3.30 },
      { weight: '350g', price: 6.40 },
      { weight: '1,5 kg', price: 30.00 },
    ],
    category: 'tuore',
    inStock: true,
    slug: 'black-pearl-vinokas',
    images: [
      { src: '/black-hero.jpg', alt: 'Black Pearl – syvänsinimustia lakkeja' },
      { src: '/black-velvet.jpg', alt: 'Black Pearl – samettinen pintarakenne' },
      { src: '/black-detail.jpg', alt: 'Black Pearl – paksut varret ja tummat lakit' },
      { src: '/black-top.jpg', alt: 'Black Pearl – ylhäältä kuvattuna' },
    ],
    tags: ['gluteeniton', 'vegaaninen', 'kotimainen', 'premium', 'tuore'],
    vatPercent: 13.5,
  },
  {
    id: '4',
    name: 'Koivuvinokas',
    subtitle: 'Tuore · Pleurotus pulmonarius',
    shortDesc: 'Klassinen koivuvinokas vehnän oljella ja koivupurulla kasvatettuna.',
    description: 'Koivuvinokas on perinteisin vinokkaamme – luotettava, monipuolinen ja maultaan miellyttävä. Kermainen väri, pehmeä rakenne ja mieto aromi tekevät siitä helppokäyttöisen arkipäivän raaka-aineen.',
    cultivation: 'Kasvatettu vehnän oljella ja koivupurulla Säynätsalossa. Kasvualusta kompostoituu käytön jälkeen.',
    culinary: 'Sopii paistamiseen, keitoihin, pastaan ja pizzan täytteeksi. Perusvinokas johon kaikki reseptit sopivat.',
    storage: 'Säilyy jääkaapissa n. 7–10 vrk.',
    sizes: [
      { weight: '150g', price: 3.30 },
      { weight: '350g', price: 6.40 },
      { weight: '1,5 kg', price: 30.00 },
    ],
    category: 'tuore',
    badge: 'Suosituin',
    inStock: true,
    slug: 'koivuvinokas',
    images: [
      { src: '/koivu-farm.jpg', alt: 'Koivuvinokas kasvamassa tilalla' },
      { src: '/farm-overview.jpg', alt: 'Kasvatushalli – erilaisia vinokkaita' },
    ],
    tags: ['gluteeniton', 'vegaaninen', 'kotimainen', 'tuore'],
    vatPercent: 13.5,
  },
]

export const founderPosts: Post[] = [
  {
    id: '1',
    date: 'Tänään',
    title: 'Uusi satokausi alkoi – sitruunavinokkaat kasvavat täydellä teholla',
    body: 'Kasvatushallin hyllyillä näyttää nyt hyvältä! Sitruunavinokkaan uusi kasvuerä on saavuttanut parhaan korjuuhetken. Keltaiset tertut ovat tiheitä ja aromaattisia. Tilaa ennen perjantaita, niin pakkaamo lähettää tilauksesi ensi viikon alussa.',
    author: 'Finnmycel',
  },
  {
    id: '2',
    date: '3 päivää sitten',
    title: 'Black Pearl – miksi tummanharmaa sieni on grillauksen paras ystävä',
    body: 'Black Pearl -vinokas on hybridilaji joka yhdistää kuningasvinokkaan lihakkuuden tavallisen vinokkaan helppouteen. Tiivis rakenne kestää grillin kuumuuden erinomaisesti – saa kauniin paistopinnan ilman marinointia. Umami on jo valmiina.',
    author: 'Finnmycel',
  },
  {
    id: '3',
    date: '1 viikko sitten',
    title: 'Säynätsalon tilalta suoraan pöytääsi – näin toimitusketju toimii',
    body: 'Meillä ei ole välikäsiä. Sienet kasvavat Saaritie 1:ssä, pakataan samana päivänä kun ne korjataan, ja PostNordin viilennyskuljetus vie ne perille 1–2 arkipäivässä. Pakkauksemme on kierrätettävää kartonkia. Talvella kasvatushallin lämpö tulee maalämmöstä.',
    author: 'Finnmycel',
  },
]
