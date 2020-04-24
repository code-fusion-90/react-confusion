import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';


function RenderCard({item, isLoading, errMessage}){
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMessage) {
        return(
                <h4>{errMessage}</h4>
        );
    }
    else{
        return(
            <FadeTransform in transformProps = {{
                exitTransform: 'scale(0.5) translate(0.5)'
            }} >
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>: null}
                        <CardText> {item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>

        );
    }

}

function Home(props){


    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.dish} isLoading = {props.dishIsLoading} errMessage = {props.dishErrMessage}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.promotion} isLoading = {props.promoIsLoading} errMessage = {props.promoErrMessage}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.leader} isLoading = {props.leaderIsLoading} errMessage = {props.leaderErrMessage}/>
                </div>
            </div>
        </div>

    );

}


export default Home;