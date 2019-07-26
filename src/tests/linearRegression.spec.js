import { findRegressionLine } from '../utils/linearRegression';

describe('linearRegression', () => {
    it('should not accept arrays of different sizes', () => {
        const samplesX = [-1, 0, 1, 2];
        const samplesY = [0, 2, 4, 5, 5];

        expect(() => findRegressionLine(samplesX, samplesY)).toThrow(Error);
    });

    it('should calculate correctly the least squares regression line', () => {
        const samplesX = [-1, 0, 1, 2];
        const samplesY = [0, 2, 4, 5];
        const [a, b] = findRegressionLine(samplesX, samplesY);
        expect(a).toEqual(1.7);
        expect(b).toEqual(1.9);
    });

    it('should calculate correctly the least squares regression line #2', () => {
        const samplesX = [95, 85, 80, 70, 60];
        const samplesY = [85, 95, 70, 65, 70];
        const [a, b] = findRegressionLine(samplesX, samplesY);
        expect(a).toEqual(0.6438356164383562);
        expect(b).toEqual(26.78082191780822);
    });
});
