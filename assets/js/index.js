const permissions = ['0','1','2','3','4','5','6','7','8','9','-','+',','];

const registro = document.getElementById('registro');
const tela = document.getElementById('display');
const inpValor = document.getElementById('valor');
const imprimir = document.getElementById('imprimir');
const audioImpressao = new Audio('assets/impressao.mp3');
const registrar = [];

inpValor.value = '0.00';

const print = (valor, classe) => {
    let p = document.createElement('p');
    p.innerHTML = valor;
    p.className = classe;
    registro.appendChild(p);
    audioImpressao.play();
}

const adicao = (valor) => {
    if(valor === "") return;
    valor = `${parseFloat(valor).toFixed(2)}`;
    print('+ ' + valor, 'green');
    registrar.push({ val : valor, operator: '+'}); 
    calc();
}

const sub = (valor) => {
    if(valor === "") return;
    valor = `${parseFloat(valor).toFixed(2)}`;
    print('- ' + valor, 'red');
    registrar.push({ val : valor, operator: '-'}); 
    calc()
}

const display = (valor) => {
    valor = valor.replace(',','.');
    
    let verPontos = tela.value.split('.');
    if(verPontos.length > 1 && valor === '.') valor = null;
    
    switch (valor) {
        case '+':
                valor = null;
                adicao(tela.value);
            break;
        case '-':
                valor = null;
                sub(tela.value);
            break;
    }

    if(valor) tela.value += valor;
}

const calc = () => {
    tela.value = '';
    let conc = ""
    registrar.forEach( (item, key) => {
        item.val = item.val.replace(',','.');
        let texto = `${item.operator}${item.val}`;
        conc += texto;
    });


    try {
        inpValor.value = `${eval(conc).toFixed(2)}`;
    } catch {
        inpValor.value = 'Error';
    }
    
}

window.addEventListener('keydown', (e) => {
    let key = e.key;

    permissions.forEach( el => {
        if(key == el) {
            display(key);
        }
    });
})


const impressao = () => {
    print('Total: '+ inpValor.value);

    const el = registro.innerHTML;
    const estilo = `
        <style>
            body {
                padding: 5px 5px 5px 0;
                background: #cfc8b5;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                font-family: 'Courier New', monospace;
                font-size: 14px;
                background-image: 
                    radial-gradient(rgba(0,0,0,0.05) 40%, transparent 10%);
                background-size: 4px 4px, 100% 20px; 
            }
            .green {color: rgb(15, 77, 15);}
            .red {color: rgb(161, 27, 27);}
            p {
                margin-bottom: 1px;
                padding: 0 5px;
            }

        </style>
    `;

    const janela = window.open('','','width=600','height=600');
    janela.document.write('<html><head><title>Documento</title>');
    janela.document.write(estilo);
    janela.document.write('</head><body>');
    janela.document.write(el);
    janela.document.write('</body></html>');
    janela.document.close();
    janela.print();
}

imprimir.addEventListener('click', impressao);
