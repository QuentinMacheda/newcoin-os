import { join } from 'path'

/**
 * Paths
 **/

const preloadPath = join(__dirname, 'preload.js')
const rendererPath = join(__dirname, '..', 'renderer')
const onlineModeURL = 'https://os.newcoin.org'

const mainPath = join('file://', join(rendererPath, 'index.html'))
const privateModePath = join('file://', join(rendererPath, 'jan.html'))
const quickAskPath = join(rendererPath, 'search.html')

const mainUrl = 'http://localhost:3000'
const privateModeURL = 'http://localhost:3000/jan/'
const quickAskUrl = `${mainUrl}/search`

export { 
    preloadPath,
    rendererPath, 
    onlineModeURL, 
    mainPath, 
    privateModePath, 
    quickAskPath, 
    mainUrl, 
    privateModeURL, 
    quickAskUrl 
};