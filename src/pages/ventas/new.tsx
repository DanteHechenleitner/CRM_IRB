import { Card, Container,Heading} from "@chakra-ui/react";
import VentasForm from "components/entities/ventas/ventasForm";
import { NextPage } from "next";


const NewCliente: NextPage = ()=>{


    return <Container mt={8} >   
        <Card padding={4}> 
            <Heading textAlign="center" mb={6}>VENTAS</Heading>
            <VentasForm/>
        </Card>
    </Container>
}


export default NewCliente