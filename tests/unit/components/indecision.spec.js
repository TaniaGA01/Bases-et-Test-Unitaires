/*  
Pour la maj il faut utiliser la commande 'yarn test:unit -u indecision'
*/
import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/Indecision';

describe('Indecision Component', () => {

    let wrapper;
    let clgSpy; // Les spy's sont des espions qui attends des événements

    // Mock : résoudre erreurs dues aux espions sur le fetch (ligne 29 Indecision.vue) :
    global.fetch = jest.fn( () => Promise.resolve({ 
        json: () => Promise.resolve({ // les propriétés suivantes viennent de https://yesno.wtf/#api
            answer: 'yes',
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }) )


    beforeEach(() => {

        wrapper = shallowMount(Indecision)
        clgSpy = jest.spyOn(console, 'log')// fonction espion

        jest.clearAllMocks() // netoie le cache pour ne pas avoir des repetition donc des erreurs

    });

     // TEST 1 : SnapShot, une copie du composant sera créée dans un fichier __snapshot__
    test('Avoir match avec le snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })
     // TEST 2 : Test dans l'input
    test('Écrire dans l\'input sans le symbole ? ne doit rien envoyer (console.log)', async () => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')// vm --> voir doc https://v1.test-utils.vuejs.org/api/wrapper/

        const input = wrapper.find('input')
        await input.setValue('Hello World')

        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()

    })
     // TEST 3 : Test dans l'input avec le symbole ?
    test('Écrire dans l\'input avec le symbole ? doit activer le getAnswer', async() => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')// vm --> voir doc https://v1.test-utils.vuejs.org/api/wrapper/

        const input = wrapper.find('input')
        await input.setValue('Hello World ?')

        expect(clgSpy).toHaveBeenCalledTimes(2)
        expect(getAnswerSpy).toHaveBeenCalled()


    })
     // TEST 4 : Test getAnswer
    test('Test sur le getAnswer', async() => {

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Oui !')

    })
    // TEST 5 : Test getAnswer + faille avec l'API
    test('Test sur le getAnswer avec faille de l\'API', async() => {

        //simuler la faille du fetch :
        fetch.mockImplementationOnce(() => Promise.reject('API est down'))
        
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('Impossible de charger de l\'API')
    })


})