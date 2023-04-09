import * as d3 from 'd3';

// For a given movie score return the appropriate color on a scale a of red to green.
const ratingColorSpectrum = d3.scaleLinear<string>()
    .domain([0, 6.5, 10])
    .clamp(true)
    .range(['#ED4245', '#FEE75C', '#57F287'])
    .interpolate(d3.interpolateRgb.gamma(2.0));

const wikipediaSearchUrl = (query: string, limit: number = 1) => {
    const base = new URL('https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&format=json&origin=*');
    base.searchParams.append('search', query);
    base.searchParams.append('limit', limit.toString());
    return base.toString();
}

const omdbSearchUrl = (query: string) => {
    const base = new URL('https://www.omdbapi.com/?apikey=e25c3e9e');
    base.searchParams.append('t', query);
    return base.toString();
}

export {
    ratingColorSpectrum,
    omdbSearchUrl,
    wikipediaSearchUrl,
};