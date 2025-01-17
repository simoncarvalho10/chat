import React from "react";

function Layout(){
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0'); // Adiciona '0' se o dia for menor que 10
    const nomesMeses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mes = nomesMeses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const horaAtual = `${horas}:${minutos}`;
    
    const fullDate = `${mes} ${dia}, ${ano}, ${horaAtual}`
    
    console.log('Data e hora: ',fullDate)    

    return(
        <div className='flex flex-col w-full h-screen'>
            <div className="w-full bg-gray-100 border-b-2 border-gray-300">
                <div className="flex items-center font-bold text-[20px] px-4 my-6">
                    <p>Atendimento</p>
                </div>
            </div>
            <div className="p-4 flex flex-col grow w-full gap-4">
                <div className="flex justify-end">
                    <div className="flex flex-col gap-1">
                        <p className="p-3 text-right bg-gray-300 rounded-l-full rounded-tr-full inline-block">teste aaaa aaaa aaa</p>
                        <p className="text-right text-sm text-gray-700">{fullDate}</p>
                    </div>
                </div>
                <div className="flex justify-start">
                <div className="flex flex-col gap-1">
                    <p className="p-3 text-left bg-blue-300 rounded-tl-full rounded-r-full inline-block">teste bbbb bb bbb</p>
                    <p className="text-left text-sm text-gray-700">{fullDate}</p>
                </div>
                </div>
            </div>
            <div className="w-full bg-gray-200 border-t-2 border-gray-300">
                <div className="flex px-4 my-5 gap-3">
                    <input type="text" placeholder="Digite a sua mensagem..." className="bg-gray-200 border border-blue-500 p-2 rounded-full grow" />
                    <button className="w-[70px] bg-green-400">OK</button>
                </div>
            </div>
        </div>
        
    )
}
export default Layout