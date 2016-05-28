// O nome do projeto é erd, aqui ele faz com que todos os highlither sejam usandos abaixos venham da joint.shape
var jarbas = joint.shapes.erd;

//   Variavel graph é um novo objeto da classe joint.dia.Graph esta na documentação deles
var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    width: 1000, //695,largura
    height: 1000, //600, altura
    gridSize: 1, // Tamanho da malha para movimentar as caixas
    model: graph, // ele utiliza o do graph sempre sera o graph
    linkPinning: false, //O link ficara solto na tela ou preso na ultima caixa
    linkConnectionPoint: joint.util.shapePerimeterConnectionPoint // aqui vc customiza os pontos para os links a função retorna X e Y o shapePerimeterConnectionPoint é uma função que já otimiza as entradas.
});

var highlighter = V('path', {
    'stroke': '#e9fc03', // Stroke -> #e9fc03 storke é a cor da borda
    'stroke-width': '2px', // stroke-width -> 2px é a grossura das bordas
    'fill': 'transparent', // fill -> transparent cor do preenchimento
    'pointer-events': 'none' // pointer-events -> none se o mause passar, clicar, etc...
});

// Tipos de caixas
jarbas.Attribute.prototype.getHighlighterPath = function(w, h) {

    return ['M', 0, h / 2, 'A', w / 2, h / 2, '0 1,0', w, h / 2, 'A', w / 2, h / 2, '0 1,0', 0, h / 2].join(' ');
};

jarbas.Entity.prototype.getHighlighterPath = function(w, h) {

    return ['M', w, 0, w, h, 0, h, 0, 0, 'z'].join(' ');
};

jarbas.Relationship.prototype.getHighlighterPath = function(w, h) {

    return ['M', w / 2, 0, w, w / 2, w / 2, w, 0, w / 2, 'z'].join(' ');
};

jarbas.ISA.prototype.getHighlighterPath = function(w, h) {

    return ['M', -8, 1, w + 8, 1, w / 2, h + 2, 'z'].join(' ');
};
// Unbind orignal highligting handlers.
paper.off('cell:highlight cell:unhighlight');

// Bind custom ones.
paper.on('cell:highlight', function(cellView) {

    var padding = 5;

    var bbox = g.rect(cellView.getBBox({ useModelGeometry: true })).moveAndExpand({
        x: -padding,
        y: -padding,
        width: 2 * padding,
        height: 2 * padding
    });

    highlither.translate(bbox.x, bbox.y, { absolute: true });
    highlither.attr('d', cellView.model.getHighlighterPath(bbox.width, bbox.height));

    V(paper.viewport).append(hightlighter);
});

paper.on('cell:unhighlight', function() {

    highlighter.remove();
});


var entrada = new jarbas.ISA({ // cria a caixa EMPLOYEE

    position: { x: 100, y: 200 }, //posição
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Oi eu sou uma entrada', //texto
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' } //estilo
        },
        '.outer, .inner': {
            fill: '#31d0c6', //cor interna
            stroke: 'none', //cor da linha
            filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
        }
    }
});
var saida = new jarbas.Relationship({ // cria a caixa EMPLOYEE

    position: { x: 200, y: 300 }, //posição
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Oi eu sou uma saida', //texto
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' } //estilo
        },
        '.outer, .inner': {
            fill: '#31d0c6', //cor interna
            stroke: 'none', //cor da linha
            filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
        }
    }
});

var core = new jarbas.Entity({ // cria a caixa EMPLOYEE

    position: { x: 150, y: 250 }, //posição
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Eu sou o Jarbas', //texto
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' } //estilo
        },
        '.outer, .inner': {
            fill: '#31d0c6', //cor interna
            stroke: 'none', //cor da linha
            filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
        }
    }
});
var createLink = function(elm1, elm2) {

    var myLink = new jarbas.Line({
        source: { id: elm1.id },
        target: { id: elm2.id }
    });

    return myLink.addTo(graph);
};

var createLabel = function(txt) {
    return {
        labels: [{
            position: -20,
            attrs: {
                text: { dy: -8, text: txt, fill: '#ffffff' },
                rect: { fill: 'none' }
            }
        }]
    };
};

// Add shapes to the graph

graph.addCells([entrada, saida, core]);

createLink(entrada, core).set(createLabel('enviando'));
createLink(core, saida);
