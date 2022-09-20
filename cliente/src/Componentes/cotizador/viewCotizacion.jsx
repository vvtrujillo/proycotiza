import React, { useState } from "react";
import {Button, Container} from 'reactstrap'
import { useParams } from "react-router-dom";
import TopNav from "../Navs/topNav";
import axios from "axios";

const ViewCotizacion = () => {

    const {id} = useParams(); //rescato el id desde el parametro de la URL

    const[pdfSource, setPdfSource] = useState();

    const buscarPdf = () => {
        axios(`/api/v1/cotizaciones/pdf/${id}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(response => {
        //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});
        //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            setPdfSource(fileURL);
        //Open the URL on new Window
            //window.open(fileURL);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <Button onClick={buscarPdf}>Generar PDF</Button>
                {pdfSource && <iframe src={pdfSource} title="description" height={300} width={300}></iframe> }                
            </Container>            
        </div>
    )
}

export default ViewCotizacion;