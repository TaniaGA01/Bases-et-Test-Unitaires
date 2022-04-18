/*  
Pour la maj il faut utiliser la commande 'yarn test:unit -u counter'
*/

import { shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter)
    });
    
    // TEST 1 : SnapShot, une copie du composant sera créée dans un fichier __snapshot__
    test('Avoir match avec le snapshot', () => {

        const wrapper = shallowMount( Counter )

        expect(wrapper.html()).toMatchSnapshot()

    })


    //TEST 2 : HTLM
    test('La valeur par défaut du h2 es "Counter"', () => {
        
        expect(wrapper.find('h2').exists()).toBeTruthy // Si la valeur h2 existe = true
        
        const h2Value = wrapper.find('h2').text()
        
        expect(h2Value).toBe('Counter')
    })


    //TEST 3A : FindAll vs Find

    // test('Dans <p> la valeur par défaut est 100"', () => {

    //     const pValue = wrapper.findAll('p').pop()//dernier de l'array
        
    //     expect(pValue.text()).toBe('100')
    // })


    //TEST 3B : FindAll vs Find

    test('Dans <p> la valeur par défaut est 100"', () => {

        const pValue = wrapper.find('[data-testId="counter"]').text()
        
        expect(pValue).toBe('100')
    })


    //TEST 4A : EVENTS, verification Increase Counter
    test('Augmenteret diminuer en 1 la valeur du Counter', async() => {

        const increaseBtn = wrapper.find('[data-testId="counterBtnInc"]')

        //identifier l'event :
        await increaseBtn.trigger('click')

        //capturer la valeur du p après le click
        const pValue = wrapper.find('[data-testId="counter"]').text()
        
        expect(pValue).toBe('101')

        
    })


    //TEST 4B : EVENTS, verification decrease Counter
    test('Diminuer en 1 la valeur du Counter', async() => {

        const decreaseBtn = wrapper.find('[data-testId="counterBtnDec"]')

        //identifier l'event :
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        //capturer la valeur du p après le double click
        const pValue = wrapper.find('[data-testId="counter"]').text()
        
        expect(pValue).toBe('98')
        
    })

    //TEST 5: Vérification (lire) des props dans Counter.vue
    test('Établir la valeur par défaut', () => {

        const { start } = wrapper.props()
        console.log(`start : `, start)
        console.log(`start type : `, typeof start)

        const pValue = wrapper.find('[data-testId="counter"]').text()

        expect (Number(pValue)).toBe(100)// on transforme le string pValue en nombre
        
    })


    //TEST 6: Affichage de la props 'title'
    test('Afficher la props "title"', () => {

        const title = 'hola mundo !!'

        const wrapper = shallowMount(Counter, { // cette const ignore le let wrapper de la ligne 11
            props: {
                title: title 
            }
        }) 

        expect(wrapper.find('h2').text()).toBe(title)
        
    })



})