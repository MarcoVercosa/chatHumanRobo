import React, { memo } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ReferenceLine
}
    from 'recharts';

function Charts({ data }: any) {
    console.log("charts")


    const chartData: any = [
        {
            name: data[0].reservatorios[0].Nome,
            volume: data[0].reservatorios[0].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[0].VolumeVariacaoStr.replace(",", ".")
        },
        {
            name: data[0].reservatorios[1].Nome,
            volume: data[0].reservatorios[1].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[1].VolumeVariacaoStr.replace(",", "."),
        },
        {
            name: data[0].reservatorios[2].Nome,
            volume: data[0].reservatorios[2].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[2].VolumeVariacaoStr.replace(",", ".")
        },
        {
            name: data[0].reservatorios[3].Nome,
            volume: data[0].reservatorios[3].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[3].VolumeVariacaoStr.replace(",", ".")
        },
        {
            name: data[0].reservatorios[4].Nome,
            volume: data[0].reservatorios[4].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[4].VolumeVariacaoStr.replace(",", ".")
        },
        {
            name: data[0].reservatorios[5].Nome,
            volume: data[0].reservatorios[5].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[5].VolumeVariacaoStr.replace(",", ".")
        },
        {
            name: data[0].reservatorios[6].Nome,
            volume: data[0].reservatorios[6].VolumePorcentagemAR.replace(",", "."),
            variacao: data[0].reservatorios[6].VolumeVariacaoStr.replace(",", "."),
        }

    ]

    return (

        <>
            <div className="contentChat-article-div-chart" style={{}}>

                <h3>Nível dos Sistemas de Abastecimento de São Paulo (%) - {data[0].currentDate}</h3>

                <BarChart
                    width={400}
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
                <h3>Variação dia -(%) {data[0].currentDate}</h3>

                <BarChart
                    width={345}
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
                    <Legend />

                    <ReferenceLine y={0} stroke="#e40000" />
                    <Bar dataKey="variacao" fill="#4137fb" />
                </BarChart>
            </div>
        </>



    )
}

export default memo(Charts)
