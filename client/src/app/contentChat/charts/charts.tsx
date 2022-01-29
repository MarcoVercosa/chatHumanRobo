import React, { memo, useState } from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// let width: number = 408
// let height: number = 300

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
// window.dispatchEvent(new Event('resize'));

function Charts({ data }: ICharts): JSX.Element {
    const [width, setWidth] = useState<number>(window.innerWidth < 601 ? 270 : 408)
    // const [width, setWidth] = useState<number>(window.innerWidth < 821 ? 280 : 330)

    window.addEventListener('resize', function (event) {
        let largura = window.innerWidth;
        // console.log(largura)
        if (largura < 601) {
            // console.log("largura chat ativada")
            setWidth(270)
        } else {
            setWidth(408)
        }

    });


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
                <h3>Níveis dos Sistemas de Abastecimento de São Paulo (%) - {data[0].currentDate}</h3>
                <BarChart style={{ with: "150%" }}
                    width={width}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: -30,
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
                <h3>Variações dia (%)  - {data[0].currentDate}</h3>
                <BarChart
                    width={width}
                    // width={408}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: -30,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="9 9" />
                    <XAxis dataKey="name" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Legend stroke="white" />

                    <Bar dataKey='variacao' fill="#4137fb" >
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
