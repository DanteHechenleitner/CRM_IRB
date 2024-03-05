import { Card, Container,Heading} from "@chakra-ui/react";
import ClientesForm from "components/entities/clientes/clientesForm";
import { NextPage } from "next";
import { useRouter } from "next/router";


const EditCliente: NextPage = ()=>{

    const router = useRouter()
    console.log(router)
    return <Container mt={8} >   
        <Card padding={4}> 
            <Heading textAlign="center" mb={6}>Editar Cliente</Heading>
            <ClientesForm clienteId= {router.query.clienteId as string} />
        </Card>
    </Container>
}


export default EditCliente