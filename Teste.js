// O nome do projeto é erd, aqui ele faz com que todos os formatos sejam usandos abaixos venham da joint.shape
var erd = joint.shapes.erd;

//   Variavel graph é um novo objeto da classe joint.dia.Graph esta na documentação deles
var graph = new joint.dia.Graph();

// Aqui ele determina o tamanho da tela que o fluxograma terá acesso
var paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    width: 1000, //695,largura
    height: 1000, //600, altura
    gridSize: 1, // Tamanho da malha para movimentar as caixas
    model: graph, // ele utiliza o do graph sempre sera o graph
    linkPinning: false, //when set to true (the default), links can be pinned to the paper meaning a source or target of a link can be a point.
    //If you do not want to let the user to drag a link and drop it somewhere in a blank paper area, set this to false.
    //The effect is that the link will be returned to its original position whenever the user drops it somewhere in a blank paper area.
    linkConnectionPoint: joint.util.shapePerimeterConnectionPoint // aqui vc customiza os pontos para os links a função retorna X e Y o shapePerimeterConnectionPoint é uma função que já otimiza as entradas.
});

// Custom highlighter - display an outline around each element that fits its shape.

var highlighter = V('path', {
    'stroke': '#e9fc03', // Stroke -> #e9fc03 storke é a cor da borda
    'stroke-width': '2px', // stroke-width -> 2px é a grossura das bordas
    'fill': 'transparent', // fill -> transparent cor do preenchimento
    'pointer-events': 'none' // pointer-events -> none se o mause passar, clicar, etc...
});

// Define a specific highligthing path for every shape.

erd.Attribute.prototype.getHighlighterPath = function(w, h) {

    return ['M', 0, h / 2, 'A', w / 2, h / 2, '0 1,0', w, h / 2, 'A', w / 2, h / 2, '0 1,0', 0, h / 2].join(' ');
};

erd.Entity.prototype.getHighlighterPath = function(w, h) {

    return ['M', w, 0, w, h, 0, h, 0, 0, 'z'].join(' ');
};

erd.Relationship.prototype.getHighlighterPath = function(w, h) {

    return ['M', w / 2, 0, w, w / 2, w / 2, w, 0, w / 2, 'z'].join(' ');
};

erd.ISA.prototype.getHighlighterPath = function(w, h) {

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

    highlighter.translate(bbox.x, bbox.y, { absolute: true });
    highlighter.attr('d', cellView.model.getHighlighterPath(bbox.width, bbox.height));

    V(paper.viewport).append(highlighter);
});

paper.on('cell:unhighlight', function() {

    highlighter.remove();
});

// Create shapes

var employee = new erd.Entity({ // cria a caixa EMPLOYEE

    position: { x: 100, y: 200 }, //posição
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Employee', //texto
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

var wage = new erd.WeakEntity({ // cria uma caixa com efeitos

    position: { x: 530, y: 200 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Wage',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.inner': {
            fill: '#31d0c6',
            stroke: 'none',
            points: '155,5 155,55 5,55 5,5'
        },
        '.outer': {
            fill: 'none',
            stroke: '#31d0c6',
            points: '160,0 160,60 0,60 0,0',
            filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
        }
    }
});

var paid = new erd.IdentifyingRelationship({

    position: { x: 350, y: 190 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Gets paid',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.inner': {
            fill: '#7c68fd',
            stroke: 'none'
        },
        '.outer': {
            fill: 'none',
            stroke: '#7c68fd',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
        }
    }
});

var isa = new erd.ISA({

    position: { x: 125, y: 300 },
    attrs: {
        text: {
            text: 'ISA',
            fill: '#ffffff',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        polygon: {
            fill: '#fdb664',
            stroke: 'none',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
        }
    }
});

var number = new erd.Key({

    position: { x: 1, y: 90 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Number',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.outer, .inner': {
            fill: '#feb662',
            stroke: 'none'
        },
        '.outer': {
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
        }
    }
});

var employeeName = new erd.Normal({

    position: { x: 75, y: 30 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Name',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.outer': {
            fill: '#fe8550',
            stroke: '#fe854f',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
        }
    }
});

var skills = new erd.Multivalued({

    position: { x: 150, y: 90 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Skills',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0px 1px #333333' }
        },
        '.inner': {
            fill: '#fe8550',
            stroke: 'none',
            rx: 43,
            ry: 21

        },
        '.outer': {
            fill: '#464a65',
            stroke: '#fe8550',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
        }
    }
});

var amount = new erd.Derived({

    position: { x: 440, y: 80 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Amount',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.inner': {
            fill: '#fca079',
            stroke: 'none',
            'display': 'block'
        },
        '.outer': {
            fill: '#464a65',
            stroke: '#fe854f',
            'stroke-dasharray': '3,1',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
        }
    }
});

var uses = new erd.Relationship({

    position: { x: 300, y: 390 },
    attrs: {
        text: {
            fill: '#ffffff',
            text: 'Uses',
            'letter-spacing': 0,
            style: { 'text-shadow': '1px 0 1px #333333' }
        },
        '.outer': {
            fill: '#797d9a',
            stroke: 'none',
            filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
        }
    }
});

// Create new shapes by cloning

var salesman = employee.clone().translate(0, 200).attr('text/text', 'Salesman');

var date = employeeName.clone().position(590, 80).attr('text/text', 'Date');

var car = employee.clone().position(430, 400).attr('text/text', 'Company car');

var plate = number.clone().position(405, 500).attr('text/text', 'Plate');


// Helpers

var createLink = function(elm1, elm2) {

    var myLink = new erd.Line({
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

graph.addCells([employee, salesman, wage, paid, isa, number, employeeName, skills, amount, date, plate, car, uses]);

createLink(employee, paid).set(createLabel('1'));
createLink(employee, number);
createLink(employee, employeeName);
createLink(employee, skills);
createLink(employee, isa);
createLink(isa, salesman);
createLink(salesman, uses).set(createLabel('0..1'));
createLink(car, uses).set(createLabel('1..1'));
createLink(car, plate);
createLink(wage, paid).set(createLabel('N'));
createLink(wage, amount);
createLink(wage, date);
