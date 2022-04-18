/* 
Le but de ce test unitaire est de faire un photo (copie) du composant Counter. 
Pour la maj il faut utiliser la commande yarn test:unit -u
*/

import { shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    
    // TEST 1 : SnapShot, une copie du composant sera créée dans un fichier __snapshot__
    // test('Avoir match avec le snapshot', () => {

    //     const wrapper = shallowMount( Counter )

    //     expect(wrapper.html()).toMatchSnapshot()

    // })


    //TEST 2 : HTLM
    test('La valeur par défaut du h2 es "Counter"', () => {
        
        const wrapper = shallowMount(Counter)

        expect(wrapper.find('h2').exists()).toBeTruthy // Si la valeur h2 existe = true
        
        const h2Value = wrapper.find('h2').text()
        
        expect(h2Value).toBe('Counter')
    })


    //TEST 3A : FindAll vs Find

    // test('Dans <p> la valeur par défaut est 100"', () => {

    //     const wrapper = shallowMount(Counter)

    //     const pValue = wrapper.findAll('p').pop()//dernier de l'array
        
    //     expect(pValue.text()).toBe('100')
    // })


    //TEST 3B : FindAll vs Find

    test('Dans <p> la valeur par défaut est 100"', () => {

        const wrapper = shallowMount(Counter)

        const pValue = wrapper.find('[data-testId="counter"]').text()
        
        expect(pValue).toBe('100')
    })


    //TEST 4 : EVENTS
    
})