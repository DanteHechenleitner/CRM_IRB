import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner } from "@chakra-ui/react"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { env } from "~/env.mjs";
import { useRouter } from "next/router";
import { DevTool } from "@hookform/devtools";

const DOC_TYPES = ["Cedula", "Pasaporte", "DNI", "CUIT",] as const

const schema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    document_type: z.enum(DOC_TYPES),
    document_value: z.string().min(8),
    email: z.string().email("Email invalido"),
})

export type Cliente = z.infer<typeof schema>

interface Props {
    clienteId? : string
}

const ClientesForm = ({clienteId} : Props) =>{
    const {
        register, 
        getValues, 
        formState: {errors, isLoading}, 
        handleSubmit, 
        control,
        reset
    } = useForm<Cliente>({
        resolver: zodResolver(schema),
        defaultValues: async () => {
            if(!clienteId) return {}
            const {data} = 
            await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clientes/${clienteId}`, 
            {withCredentials: true}
            )
            return data.data
            
        },
    })

    const onSubmit = async (data: Cliente) => {
        const PARAMS = !!clienteId ? `/${clienteId}` : ""
        const res = await axios(
            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clientes${PARAMS}`,
            {
                method: !!clienteId ? "PUT" : "POST",
                data,
                withCredentials: true
            },
        )
        reset()
        console.log({res})
        router.push("/clientes")
    }

    if(isLoading) return <Spinner alignSelf="center"/>

    const router = useRouter()
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl marginBottom={5} isInvalid={!!errors.firstname}>
                <FormLabel>Razon Social</FormLabel>
                <Input 
                type='text' 
                placeholder="Nombre"
                    {...register("firstname")}
                />
                <FormErrorMessage> {errors.firstname?.message} </FormErrorMessage>
            </FormControl>
            <FormControl marginBottom={5} isInvalid={!!errors.lastname}>
                <FormLabel>Apellido</FormLabel>
                <Input 
                type='text' 
                placeholder="Apellido"
                    {...register("lastname")}
                />
                <FormErrorMessage> {errors.lastname?.message} </FormErrorMessage>
            </FormControl>

            <Flex>
                <FormControl>
                    <FormLabel>Tipo de documento</FormLabel>
                    <Select placeholder='Seleccionar' {...register("document_type")}>
                        {DOC_TYPES.map(op => (
                            <option  key={op} value={op}> {op} </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl marginBottom={5} isInvalid={!!errors.document_value}>
                    <FormLabel>NUMERO</FormLabel>
                    <Input 
                    type='text' 
                    placeholder=""
                        {...register("document_value")}
                    />
                    <FormErrorMessage> {errors.document_value?.message} </FormErrorMessage>
                </FormControl>


            </Flex>


            <FormControl marginBottom={5} isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input 
                type='text' 
                placeholder="Ingresa tu email"
                    {...register("email")}
                />
                <FormErrorMessage> {errors.email?.message} </FormErrorMessage>
            </FormControl>

            <ButtonGroup>
                <Button colorScheme="purple" type="submit" >
                    {clienteId ? "EDITAR" : "CREAR"}
                </Button>
                <Button colorScheme="gray"  onClick={()=>{
                router.push("/clientes")
                }}>VOLVER</Button>
            </ButtonGroup>
        
        </form>
        <DevTool control={control}/>
        </>
    )
}



export default ClientesForm
