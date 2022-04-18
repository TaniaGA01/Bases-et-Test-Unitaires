describe('Example Component', () => {
    test('le test doit être > à 10', () => {

        //Arranger
        let value = 12;

        //Estimule
        value = value + 2

        //Regarder le reésultat
        expect( value ).toBeGreaterThan(10) // documentation Jest https://jestjs.io/es-ES/docs/expect
    })
})