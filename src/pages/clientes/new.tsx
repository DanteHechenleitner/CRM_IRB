import { Card, Container,Heading} from "@chakra-ui/react";
import ClientesForm from "components/entities/clientes/clientesForm";
import { NextPage } from "next";


const NewCliente: NextPage = ()=>{


    return <Container mt={8} >   
        <Card padding={4}> 
            <Heading textAlign="center" mb={6}>Nuevo Cliente</Heading>
            <ClientesForm/>
        </Card>
    </Container>
}


export default NewCliente