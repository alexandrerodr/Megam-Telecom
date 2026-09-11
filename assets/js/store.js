/* store.js — fonte única de dados (manual, sem API, sem PHP, sem banco) */
/* Edite os planos e regiões diretamente aqui. */

export const ADMIN_PASSWORD = 'Megam_123'

const DATA = {
  plans: [
    { id: 1, type: 'internet', tag: 'internet', speed: '200', unit: 'Mega', name: 'MEGASTART + SABEDORIA', price: '89,90', featured: false, description: 'Pague 100, Leve 200 Megas', features: ['200 Megas de velocidade', 'Wi-Fi grátis', 'JornalZ', 'Digi Livros'], link: '', sort_order: 1 },
    { id: 2, type: 'internet', tag: 'internet', speed: '400', unit: 'Mega', name: 'MEGAPOWER + SABEDORIA', price: '99,90', featured: false, description: 'Pague 200, Leve 400 Megas', features: ['400 Megas de velocidade', 'Wi-Fi grátis', 'Olé TV', 'JornalZ', 'Digi Livros'], link: '', sort_order: 2 },
    { id: 3, type: 'internet', tag: 'internet', speed: '500', unit: 'Mega', name: 'MEGAFLASH + SABEDORIA', price: '109,90', featured: false, description: 'Pague 250, Leve 500 Megas', features: ['500 Megas de velocidade', 'Wi-Fi grátis', 'Olé TV', 'JornalZ', 'Digi Livros'], link: '', sort_order: 3 },
    { id: 4, type: 'internet', tag: 'internet', speed: '600', unit: 'Mega', name: 'MEGAPLUS + SABEDORIA', price: '129,90', featured: true, description: 'Pague 300, Leve 600 Megas', features: ['600 Megas de velocidade', 'Wi-Fi grátis', 'Olé TV', 'JornalZ', 'Digi Livros'], link: '', sort_order: 4 },
    { id: 5, type: 'internet', tag: 'internet', speed: '800', unit: 'Mega', name: 'MEGAULTRA + SABEDORIA', price: '149,90', featured: false, description: 'Pague 400, Leve 800 Megas', features: ['800 Megas de velocidade', 'Wi-Fi grátis', 'Olé TV', 'JornalZ', 'Digi Livros'], link: '', sort_order: 5 },
    { id: 6, type: 'internet', tag: 'internet', speed: '1GB', unit: 'Mega', name: 'MEGAEXTREME + SABEDORIA', price: '179,90', featured: false, description: 'Pague 500, Leve 1000 Megas', features: ['1000 Megas de velocidade', 'Wi-Fi grátis', 'Olé TV', 'JornalZ', 'Digi Livros'], link: '', sort_order: 6 },

  { id: 7, type: 'combo', tag: 'Combo', speed: '200', unit: 'Mbps', name: 'MEGASTART + CINEMA', price: '119,90', featured: false, description: 'Pague 100, leve 200 Mbps', features: ['200 Mbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV'], link: '', sort_order: 7 },
  { id: 8, type: 'combo', tag: 'Combo', speed: '400', unit: 'Mbps', name: 'MEGAPOWER + CINEMA', price: '129,90', featured: false, description: 'Pague 200, leve 400 Mbps', features: ['400 Mbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV'], link: '', sort_order: 8 },
  { id: 9, type: 'combo', tag: 'Combo', speed: '500', unit: 'Mbps', name: 'MEGAFLASH + CINEMA', price: '139,90', featured: false, description: 'Pague 250, leve 500 Mbps', features: ['500 Mbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV'], link: '', sort_order: 9 },
  { id: 10, type: 'combo', tag: 'Combo', speed: '600', unit: 'Mbps', name: 'MEGAPLUS + CINEMA', price: '159,90', featured: true, description: 'Pague 300, leve 600 Mbps', features: ['600 Mbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV', 'HBO Max'], link: '', sort_order: 10 },
  { id: 11, type: 'combo', tag: 'Combo', speed: '800', unit: 'Mbps', name: 'MEGAULTRA + CINEMA', price: '179,90', featured: false, description: 'Pague 400, leve 800 Mbps', features: ['800 Mbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV', 'HBO Max'], link: '', sort_order: 11 },
  { id: 12, type: 'combo', tag: 'Combo', speed: '1', unit: 'Gbps', name: 'MEGAEXTREME + CINEMA', price: '249,90', featured: false, description: 'Pague 500, leve 1000 Mbps', features: ['1 Gbps de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Watch TV', 'HBO Max'], link: '', sort_order: 12 },
  
{ id: 13, type: 'esportes', tag: 'Esportes', speed: '200', unit: 'Mega', name: 'MEGASTART + ESPORTES', price: '119,90', featured: false, description: 'Contrate 100, leve 200 Mega', features: ['200 Mega de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 13 },
  { id: 14, type: 'esportes', tag: 'Esportes', speed: '400', unit: 'Mega', name: 'MEGAPOWER + ESPORTES', price: '129,90', featured: false, description: 'Contrate 200, leve 400 Mega', features: ['400 Mega de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 14 },
  { id: 15, type: 'esportes', tag: 'Esportes', speed: '500', unit: 'Mega', name: 'MEGAFLASH + ESPORTES', price: '139,90', featured: false, description: 'Contrate 250, leve 500 Mega', features: ['500 Mega de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 15 },
  { id: 16, type: 'esportes', tag: 'Esportes', speed: '600', unit: 'Mega', name: 'MEGAPLUS + ESPORTES', price: '159,90', featured: false, description: 'Contrate 300, leve 600 Mega', features: ['600 Mega de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 16 },
  { id: 17, type: 'esportes', tag: 'Esportes', speed: '800', unit: 'Mega', name: 'MEGAULTRA + ESPORTES', price: '179,90', featured: false, description: 'Contrate 400, leve 800 Mega', features: ['800 Mega de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 17 },
  { id: 18, type: 'esportes', tag: 'Esportes', speed: '1', unit: 'Gb', name: 'MEGAEXTREME + ESPORTES', price: '249,90', featured: false, description: 'Contrate 500, leve 1000 Mega', features: ['1 Gb de velocidade', 'Digi Livros', 'JornalZ', 'Olé TV', 'Discovery Channel', 'Universal', 'ESPN', 'Canais Globo', 'ge tv', 'sportv', 'N Sports', 'Premiere'], link: '', sort_order: 18 },
],
  regions: [
    { id: 1, name: 'Centro - Sarapuí', color: '#e11d29', polygon: [[-23.646096695476828,-47.834043502807624],[-23.638234022018082,-47.82992362976075],[-23.62982043838755,-47.82966613769532],[-23.621642231572597,-47.836017608642585],[-23.615193670066354,-47.83447265625001],[-23.619833520735675,-47.818765640258796],[-23.629663169995148,-47.820310592651374],[-23.63414524516467,-47.818765640258796],[-23.64295168277528,-47.81550407409668],[-23.64932025505294,-47.81284332275391],[-23.651049937206878,-47.816877365112305],[-23.649870610946007,-47.827777862548835]], planIds: [1, 2, 3, 4, 5, 6] },
    { id: 2, name: 'Cercado', color: '#e11d29', polygon: [[-23.581372849129007,-47.756838798522956],[-23.592935831760364,-47.74065971374512],[-23.588806312071657,-47.730703353881836],[-23.589868200976827,-47.72237777709962],[-23.615193670066354,-47.71722793579102],[-23.615272312971797,-47.72821426391602],[-23.603003449227153,-47.74383544921876],[-23.592360656452023,-47.75992012102506]], planIds: [1, 2, 3, 4, 5, 6] },
    { id: 3, name: 'Campo do Meio', color: '#e11d29', polygon: [[-23.560525443275637,-47.73731231689453],[-23.58692241558789,-47.72563934326172],[-23.586682508480575,-47.70903110504151],[-23.586171217297323,-47.70478248596192],[-23.577518295190988,-47.69336700439453],[-23.57429296921507,-47.691221237182624],[-23.572011593247208,-47.69310951232911],[-23.56847144862377,-47.696971893310554],[-23.55155610743623,-47.72100448608399]], planIds: [1, 2, 3, 4, 5, 6] },
    { id: 4, name: 'Jundiacanga', color: '#e11d29', polygon: [[-23.562939781622436,-47.69177055437467],[-23.572537689928392,-47.69116973955535],[-23.595531463321194,-47.68650054931641],[-23.592385236644983,-47.6707935333252],[-23.576574305545673,-47.67431259155274],[-23.556827633366165,-47.67160892486573],[-23.556827633366165,-47.683496475219734]], planIds: [1, 2, 3, 4, 5, 6] },
    { id: 5, name: 'Maria Amelia', color: '#2563eb', polygon: [[-23.578532092937927,-47.67185783464811],[-23.597340509490547,-47.665729522705085],[-23.59623935392407,-47.66203880310059],[-23.578147617850327,-47.668991088867195]], planIds: [2, 3, 4, 5] },
    { id: 6, name: 'Capela do Alto', color: '#e11d29', polygon: [[-23.455293974639385,-47.73920059204102],[-23.464261009717784,-47.71580314714811],[-23.49127260031124,-47.73834228515626],[-23.47820491254471,-47.74641036987305],[-23.472575961326488,-47.76143074035645],[-23.467891546116466,-47.761130332946784]], planIds: [1, 2, 3, 4, 5, 6] },
    { id: 7, name: 'Cabaçais', color: '#e11d29', polygon: [[-23.665515474199104,-47.8670883178711],[-23.665515474199104,-47.85344123840333],[-23.672118774277074,-47.836103439331055],[-23.68241611212136,-47.83541679382325],[-23.682966328706677,-47.86880493164063]], planIds: []},
    { id: 8, name: 'Cabaçais 2', color: '#e11d29', polygon: [[-23.648437712355403,-47.83316803135677],[-23.64985291809195,-47.827331544540364],[-23.67266903422582,-47.83335685729981],[-23.670546590229424,-47.83893585205079],[-23.670467980530614,-47.83893585205079]], planIds: []},
    { id: 9, name: 'Cond. Arumã', color: '#e11d29', polygon: [[-23.59022259375275,-47.84327198097163],[-23.58923936623538,-47.82365966865474],[-23.591756413967275,-47.823788414687456],[-23.59211036993182,-47.84292865821772]], planIds: []},
    { id: 10, name: 'Cond. Pinheiros do Lago', color: '#e11d29', polygon: [[-23.564415406587518,-47.84204292336655],[-23.566150635366306,-47.846574783325195],[-23.57578321660893,-47.84835147896957],[-23.574288543450518,-47.84384536782455],[-23.572951189886645,-47.83826637307357],[-23.568073667356693,-47.83865261117172]], planIds: []},
    { id: 11, name: 'Cerrado', color: '#e11d29', polygon: [[-23.561193201818732,-47.84703826982877],[-23.559541010137423,-47.84952735979461],[-23.543883496011404,-47.83407783586881],[-23.550690612824496,-47.81825065612794],[-23.558204489640893,-47.819066047668464],[-23.557535732680662,-47.82292842864991],[-23.578147617850327,-47.801814079284675],[-23.578698272702553,-47.8121566772461],[-23.555883495011688,-47.82743453979493]], planIds: []},
    { id: 12, name: 'Alambari', color: '#e11d29', polygon: [[-23.569454831702455,-47.891485691070564],[-23.572916281563057,-47.88541316986085],[-23.570280867798363,-47.88288116455079],[-23.565835945665906,-47.88266658782959],[-23.564852535493106,-47.87498474121094],[-23.558479859164688,-47.87678718566895],[-23.554978689390506,-47.88052082061768],[-23.54644173844543,-47.89790153503419],[-23.5490382891056,-47.90631294250489]], planIds: []},
    { id: 13, name: 'Cercadinho', color: '#e11d29', polygon: [[-23.541330612829878,-47.88770484963607],[-23.540228987573308,-47.890408516323085],[-23.532317178565933,-47.88661479949952],[-23.52244088905899,-47.890520095825195],[-23.523306569566486,-47.87455558776856],[-23.534559898002694,-47.879447937011726],[-23.537156683269835,-47.87858963012696],[-23.539438664366696,-47.88082122802735],[-23.53613371337493,-47.88339614868165]], planIds: []},
    { id: 14, name: 'Portal de Pirapora', color: '#e11d29', polygon: [[-23.65248771737241,-47.68112754900358],[-23.659013058788375,-47.66164398271941],[-23.67494865790383,-47.668476104736335],[-23.672848850094297,-47.68232917864225]], planIds: []},
    { id: 15, name: 'Cafundo', color: '#e11d29', polygon: [[-23.669406744969475,-47.66130924224854],[-23.669378739665635,-47.654674530422206],[-23.672747642600807,-47.65470027923585],[-23.671922252305357,-47.658777236938484]], planIds: []},
    { id: 16, name: 'Sarapu', color: '#e11d29', polygon: [[-23.672492165209242,-47.66313314437867],[-23.674064325853085,-47.65905618667603],[-23.67390711063979,-47.65489339828492],[-23.680156269697928,-47.65860557556153],[-23.677385453033306,-47.66351938247681],[-23.67396606636693,-47.66542911529541]], planIds: []},
    { id: 17, name: 'Alpes', color: '#e11d29', polygon: [[-23.67702076379761, -47.672365898101525], [-23.67573776201848, -47.66937926911207], [-23.6749869131578, -47.66720519186666], [-23.67643938877033, -47.66631272712403], [-23.678325319123534, -47.66656287734081], [-23.679102093726698, -47.66778499768636], [-23.67866442967764, -47.669268033882304], [-23.68004705626954, -47.66905163914718], [-23.68173928803769, -47.66921756709484], [-23.683964445202783, -47.67064034000236], [-23.683510136290927, -47.672758179631586], [-23.68015589866288, -47.67191148820957], [-23.67824017004234, -47.672035250037645]], planIds: []},
    { id: 18, name: 'Alpes', color: '#e11d29', polygon: [[-23.67702076379761,-47.672365898101525],[-23.67573776201848,-47.66937926911207],[-23.6749869131578,-47.66720519186666],[-23.67643938877033,-47.66631272712403],[-23.678325319123534,-47.66656287734081],[-23.679102093726698,-47.66778499768636],[-23.67866442967764,-47.669268033882304],[-23.68004705626954,-47.66905163914718],[-23.68173928803769,-47.66921756709484],[-23.683964445202783,-47.67064034000236],[-23.683510136290927,-47.672758179631586],[-23.68015589866288,-47.67191148820957],[-23.67824017004234,-47.672035250037645]], planIds: []},
    { id: 19, name: 'Barra', color: '#e11d29', polygon: [[-23.640494589015127,-47.676072120666504],[-23.64089509844456,-47.67746257821273],[-23.639256196278023,-47.679719924926765],[-23.63658280058386,-47.67963409423829],[-23.63646485539874,-47.681436538696296],[-23.63548197472392,-47.68405437469483],[-23.63394866613726,-47.68568515777588],[-23.632887134289263,-47.68847465515137],[-23.632572604681584,-47.6910924911499],[-23.6314324285204,-47.69143581390381],[-23.629702487110954,-47.690019607543945],[-23.629112729134444,-47.69083499908448],[-23.6278152522377,-47.689976692199714],[-23.62738275708239,-47.68753051757813],[-23.62742207488279,-47.68152236938477],[-23.62807818893519,-47.6797800068016],[-23.63217944160953,-47.6748275756836],[-23.639098939219096,-47.67229557037354],[-23.639610023969873,-47.67302513122559],[-23.63982625153295,-47.67366886138917],[-23.640121106725154,-47.674462795257575],[-23.640396304305288,-47.675042152404785]], planIds: []},
    { id: 20, name: 'Porto', color: '#e11d29', polygon: [[-23.544395935141495,-47.752375602722175],[-23.553668185421618,-47.756598472988124],[-23.55535979034352,-47.76569652596664],[-23.550245569342632,-47.767584801113124],[-23.54422626973623,-47.76998806039047],[-23.540894390243828,-47.77245998382569],[-23.538533745565335,-47.76752471923828],[-23.536291093876567,-47.776880264282234],[-23.532474563633357,-47.77782440185547],[-23.52558879088586,-47.763619422912605],[-23.522795031772922,-47.76555061340333],[-23.525706835739765,-47.77546405792237],[-23.522322841275944,-47.777566909790046],[-23.519765113314588,-47.779583930969245],[-23.516302263970843,-47.76838302612305],[-23.518663307493856,-47.764606475830085],[-23.521811299659404,-47.76074409484864],[-23.509415645212783,-47.7586841583252],[-23.50386673615084,-47.751603126525886],[-23.501623493806335,-47.74126052856446],[-23.50485060232251,-47.74070262908936],[-23.506464126937757,-47.749714851379395],[-23.51122587703272,-47.75456428527833],[-23.522676984307473,-47.75851249694825],[-23.526021621499254,-47.75477886199951],[-23.53865177880555,-47.760100364685066]], planIds: []},
  ],
}

let plansCache = null
let regionsCache = null
let nextPlanId = DATA.plans.reduce((m, p) => Math.max(m, p.id), 0) + 1
let nextRegionId = DATA.regions.reduce((m, r) => Math.max(m, r.id), 0) + 1

export const store = {
  async getPlans() {
    if (plansCache) return plansCache
    plansCache = DATA.plans.map(normalizePlan)
    return plansCache
  },

  async addPlan(plan) {
    const newPlan = {
      id: nextPlanId++,
      name: plan.name,
      speed: plan.speed,
      unit: plan.unit || 'Mb',
      price: plan.price,
      type: plan.type || 'internet',
      tag: plan.tag || (plan.type === 'combo' ? 'Combo' : 'Internet'),
      description: plan.description || '',
      features: plan.features || [],
      link: plan.link || '',
      featured: !!plan.featured,
      sort_order: plan.sort_order || DATA.plans.length + 1,
    }
    DATA.plans.push(newPlan)
    plansCache = null
    return normalizePlan(newPlan)
  },

  async updatePlan(id, patch) {
    const idx = DATA.plans.findIndex(p => String(p.id) === String(id))
    if (idx < 0) return null
    DATA.plans[idx] = { ...DATA.plans[idx], ...patch, id: DATA.plans[idx].id }
    plansCache = null
    return normalizePlan(DATA.plans[idx])
  },

  async deletePlan(id) {
    DATA.plans = DATA.plans.filter(p => String(p.id) !== String(id))
    DATA.regions.forEach(r => {
      r.planIds = (r.planIds || []).filter(pid => String(pid) !== String(id))
    })
    plansCache = null
    return true
  },

  async getRegions() {
    if (regionsCache) return regionsCache
    regionsCache = DATA.regions.map(normalizeRegion)
    return regionsCache
  },

  async getRegionPlans(regionId) {
    const plans = await this.getPlans()
    const regions = await this.getRegions()
    const region = regions.find(r => String(r.id) === String(regionId))
    if (!region) return []
    const ids = region.planIds || []
    return plans.filter(p => ids.includes(p.id) || ids.includes(String(p.id)))
  },

  async addRegion({ name, color, polygon }) {
    const newRegion = {
      id: nextRegionId++,
      name,
      color: color || '#e11d29',
      polygon: polygon || [],
      planIds: [],
    }
    DATA.regions.push(newRegion)
    regionsCache = null
    return normalizeRegion(newRegion)
  },

  async updateRegion(id, patch) {
    const idx = DATA.regions.findIndex(r => String(r.id) === String(id))
    if (idx < 0) return null
    DATA.regions[idx] = { ...DATA.regions[idx], ...patch, id: DATA.regions[idx].id }
    regionsCache = null
    return normalizeRegion(DATA.regions[idx])
  },

  async deleteRegion(id) {
    DATA.regions = DATA.regions.filter(r => String(r.id) !== String(id))
    regionsCache = null
    return true
  },

  async setRegionPlans(regionId, planIds) {
    const region = DATA.regions.find(r => String(r.id) === String(regionId))
    if (region) region.planIds = planIds
    regionsCache = null
  },

  invalidate() {
    plansCache = null
    regionsCache = null
  },
}

function normalizePlan(p) {
  return {
    id: p.id,
    name: p.name,
    speed: p.speed,
    unit: p.unit,
    price: p.price,
    type: p.type,
    tag: p.tag,
    description: p.description || '',
    features: Array.isArray(p.features) ? p.features : [],
    link: p.link || '',
    featured: !!p.featured,
    sort_order: p.sort_order || 0,
  }
}

function normalizeRegion(r) {
  return {
    id: r.id,
    name: r.name,
    color: r.color,
    polygon: Array.isArray(r.polygon) ? r.polygon : [],
    planIds: r.planIds || [],
  }
}
