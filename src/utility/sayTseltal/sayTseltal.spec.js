import { sayTseltal } from './sayTseltal';

describe('Tseltal Number', () => {

  describe('Catch errors', () => {

    test('Not a Number is rejected', () => {
        expect(() => sayTseltal("a12"))
          .toThrow(new Error("Solo se aceptan numeros / Yahtabal ha'nax"));
      });

    test('Negative integer is rejected', () => {
        expect(() => sayTseltal(-1))
          .toThrow(new Error("Numero fuera de rango / Yahtabal c'ax muc'"));
      });
  })

  describe('Initial Numbers', () => {

    test('Zero', () => {
      expect(sayTseltal(0)).toEqual("Ma'yuc");
    });

    test('One', () => {
      expect(sayTseltal(1)).toEqual("jun");
    });

    test('First twenty', () => {
      expect(sayTseltal(14)).toEqual("chanlajuneb");
    });

    test('Special exact Twenty', () => {
      expect(sayTseltal(20)).toEqual("jtahb");
    });

    test('Exceed twenty', () => {
      expect(sayTseltal(22)).toEqual("cheb scha'winic");
    });

    test('Whole twenties', () => {
      expect(sayTseltal(100)).toEqual("ho'winic");
    });

    test('379', () => {
      expect(sayTseltal(379)).toEqual("balunlajuneb sbalunlajunwinic");
    });

    test('380', () => {
      expect(sayTseltal(380)).toEqual("balunlajunwinic");
    });

    test('381', () => {
      expect(sayTseltal(381)).toEqual("jun sbahc'al");
    });
  })

  describe("jbahc'", () => {

    test('400', () => {
      expect(sayTseltal(400)).toEqual("jbahc'");
    });

    test('401', () => {
      expect(sayTseltal(401)).toEqual("jun scha'bahc'");
    });

    test('420', () => {
      expect(sayTseltal(420)).toEqual("jtahb scha'bahc'");
    });

    test('421', () => {
      expect(sayTseltal(421)).toEqual("jun scha'winic scha'bahc'");
    });

    test('800', () => {
      expect(sayTseltal(800)).toEqual("cha'bahc'");
    });

    test('7599', () => {
      expect(sayTseltal(7599)).toEqual("balunlajuneb sbahc'al sbalunlajunbahc'");
    });

    test('7600', () => {
      expect(sayTseltal(7600)).toEqual("balunlajunbahc'");
    });

    test('7601', () => {
      expect(sayTseltal(7601)).toEqual("jun spical");
    });
  })

  describe("jpic", () => {

    test('8000', () => {
      expect(sayTseltal(8000)).toEqual("jpic");
    });

    test('8003', () => {
      expect(sayTseltal(8003)).toEqual("oxeb scha'pic");
    });

    test('8020', () => {
      expect(sayTseltal(8020)).toEqual("jtahb scha'pic");
    });

    test('8800', () => {
      expect(sayTseltal(8800)).toEqual("cha'bahc' scha'pic");
    });

    test('8807', () => {
      expect(sayTseltal(8807)).toEqual("huqueb yoxbahc' scha'pic");
    });

    test('151599', () => {
      expect(sayTseltal(151599)).toEqual("balunlajuneb sbahc'al sbalunlajunbahc' sbalunlajunpic");
    });

    test('151999', () => {
      expect(sayTseltal(151999)).toEqual("balunlajuneb sbahc'al spical sbalunlajunpic");
    });

    test('152000', () => {
      expect(sayTseltal(152000)).toEqual("balunlajunpic");
    });

    test('152001', () => {
      expect(sayTseltal(152001)).toEqual("jun sbahc' bahqu'etical");
    });

    test('159599', () => {
      expect(sayTseltal(159599)).toEqual("balunlajuneb sbahc'al sbalunlajunbahc' sbahc' bahqu'etical");
    });
  })

  describe("jbahc' bahqu'etic", () => {

    test('160000', () => {
      expect(sayTseltal(160000)).toEqual("jbahc' bahqu'etic");
    });

    test('160001', () => {
      expect(sayTseltal(160001)).toEqual("jun scha'bahc' bahqu'etic");
    });
  })

  describe("jmam", () => {
    
    test('3200000', () => {
      expect(sayTseltal(3200000)).toEqual("jmam");
    });

    test('3200001', () => {
      expect(sayTseltal(3200001)).toEqual("jun scha'mam");
    });
  })
});
