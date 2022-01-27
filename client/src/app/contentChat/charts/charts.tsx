import React, { memo } from 'react'
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid,
//     Tooltip, Legend, ReferenceLine
// } from 'recharts';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


interface ICharts {
    data: Array<{
        currentDate: string;
        reservatorios: Array<{
            Nome: String;
            VolumePorcentagemAR: String;
            VolumeVariacaoStr: String;
        }>
    }>
}

interface IChartData {
    name: String;
    volume: String;
    variacao: Number;
}

function Charts({ data }: ICharts): JSX.Element {

    const chartData: Array<IChartData> = [
        {
            name: data[0].reservatorios[0].Nome,
            volume: data[0].reservatorios[0].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[0].VolumeVariacaoStr.replace(",", "."))
        },
        {
            name: data[0].reservatorios[1].Nome,
            volume: data[0].reservatorios[1].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[1].VolumeVariacaoStr.replace(",", "."),)
        },
        {
            name: data[0].reservatorios[2].Nome,
            volume: data[0].reservatorios[2].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[2].VolumeVariacaoStr.replace(",", "."))
        },
        {
            name: data[0].reservatorios[3].Nome,
            volume: data[0].reservatorios[3].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[3].VolumeVariacaoStr.replace(",", "."))
        },
        {
            name: data[0].reservatorios[4].Nome,
            volume: data[0].reservatorios[4].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[4].VolumeVariacaoStr.replace(",", "."))
        },
        {
            name: data[0].reservatorios[5].Nome,
            volume: data[0].reservatorios[5].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[5].VolumeVariacaoStr.replace(",", "."))
        },
        {
            name: data[0].reservatorios[6].Nome,
            volume: data[0].reservatorios[6].VolumePorcentagemAR.replace(",", "."),
            variacao: Number(data[0].reservatorios[6].VolumeVariacaoStr.replace(",", "."),)
        }
    ];

    return (

        <>
            <div className="contentChat-article-div-chart" style={{}}>
                <h3>Nível dos Sistemas de Abastecimento de São Paulo (%) - {data[0].currentDate}</h3>
                <BarChart
                    width={408}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="9 9" />
                    <XAxis dataKey="name" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Legend stroke="white" />

                    {/* <ReferenceLine y={0} stroke="#000000" /> */}
                    <Bar dataKey="volume" fill="#4137fb" />
                </BarChart>

            </div>
            <div className="contentChat-article-div-chart">
                <h3>Variação dia (%)  - {data[0].currentDate}</h3>
                <BarChart
                    width={408}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="9 9" />
                    <XAxis dataKey="name" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Legend stroke="white" />

                    <Bar dataKey='variacao' >
                        {chartData.map((datum: any, entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={datum.variacao > 0 ? 'blue' : 'red'}
                            />
                        ))}
                    </Bar>
                </BarChart>

            </div>
        </>
    )
}

export default memo(Charts)
