import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner } from "@chakra-ui/react"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { env } from "~/env.mjs";
import { useRouter } from "next/router";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { DeleteIcon } from '@chakra-ui/icons'

const PEYMEND_METHOD_TYPES = ["Cheque", "E-cheq", "Contado", "Transferencia",] as const

const ventaProductSchema = z.object( {
    code: z.string(),
    name: z.string(),
    qty: z.number(),
    unit_price: z.number(),
    total : z.number()
})

const TIME_UNIT =  z.enum(["Dias","Meses"])

const ventaMethodtSchema = z.object( {
    method: z.enum(PEYMEND_METHOD_TYPES),
    amount: z.number(),
    time_unit:TIME_UNIT,
    time_value: z.number(),
})

const ventaSchema = z.object({
    operetion_date: z.date(),
    products: z.array(ventaProductSchema),
    toatal_amount: z.number().nonnegative(),
    cliente: z.string(),
    cliente_document: z.string(),
    payment_methos: z.array(ventaMethodtSchema) 

})

export type Venta = z.infer<typeof ventaSchema>
type PeymentMethod = z.infer<typeof ventaMethodtSchema>

interface Props {
    ventaId? : string
}

const defaultPM: PeymentMethod = {method:"Contado",amount: 0, time_unit:"Dias", time_value:0}

const VentasForm = ({ventaId} : Props) =>{
    const [startDate, setStartDate] = useState(new Date())
    const {
        register,
        setValue, 
        getValues, 
        formState: {errors, isLoading}, 
        handleSubmit, 
        control,
        reset
    } = useForm<Venta>({
        resolver: zodResolver(ventaSchema),
        defaultValues: async () => {
            if(!ventaId) return {payment_methos: [defaultPM]}
            const {data} = 
            await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clientes/${ventaId}`, 
            {withCredentials: true}
            )
            return data.data
            
        },
    })

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control,
        name: "payment_methos"
    })

    const onSubmit = async (data: Venta) => {
        const PARAMS = !!ventaId ? `/${ventaId}` : ""
        const res = await axios(
            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas${PARAMS}`,
            {
                method: !!ventaId ? "PUT" : "POST",
                data,
                withCredentials: true
            },
        )
        reset()
        console.log({res})
        router.push("/")
    }

    if(isLoading) return <Spinner alignSelf="center"/>

    const router = useRouter()
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl marginBottom={5} isInvalid={!!errors.cliente_document}>
                <FormLabel>DNI/CUIT</FormLabel>
                <Input 
                type='text' 
                placeholder="Nombre"
                    {...register("cliente_document")}
                />
                <FormErrorMessage> {errors.cliente_document?.message} </FormErrorMessage>
            </FormControl>
            <FormControl marginBottom={5} isInvalid={!!errors.operetion_date}>
                <FormLabel>Fecha</FormLabel>
                <DatePicker 
                selected={startDate} 
                onChange={(date: Date) => setValue("operetion_date", date)} 
                ref={register("operetion_date").ref}
                />
                <FormErrorMessage> {errors.operetion_date?.message} </FormErrorMessage>
            </FormControl>

            {fields.map((field, index)=><Flex gap={3} alignItems="center">
                <FormControl mb={5}>
                    <FormLabel>Pago</FormLabel>
                    <Select placeholder='Seleccionar' {...register(`payment_methos.${index}.method`)}>
                        {PEYMEND_METHOD_TYPES.map(op => (
                            <option  key={op} value={op}> {op} </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl marginBottom={5} isInvalid={!!errors.payment_methos}>
                    <FormLabel>Monto</FormLabel>
                    <Input 
                    type='text' 
                    placeholder="monto"
                        {...register(`payment_methos.${index}.amount`)}
                    />
                    <FormErrorMessage> {errors.payment_methos?.message} </FormErrorMessage>
                </FormControl>

                <FormControl marginBottom={5} flex={6} isInvalid={!!errors.payment_methos}>
                    <FormLabel>Plazo</FormLabel>
                    <Input 
                    type='number' 
                    placeholder="plazo"
                        {...register(`payment_methos.${index}.time_value`)}
                    />
                    <FormErrorMessage> {errors.payment_methos?.message} </FormErrorMessage>
                </FormControl>

                <Flex alignItems="center">
                    <FormControl mb={5} >
                    <FormLabel>Periodo</FormLabel>
                    <Select placeholder='Seleccionar' {...register(`payment_methos.${index}.time_unit`)}>
                        {Object.keys(TIME_UNIT.Enum).map(unit => (
                            <option  key={unit} value={unit}> {unit} </option>
                        ))}
                    </Select>
                    </FormControl>
                    {index > 0 && <DeleteIcon color="gray" marginInlineStart="1" 
                    _hover={{color:"red.500", cursor:"pointer"}}
                    onClick={()=> remove(index)} />}
                   
                </Flex>

                


            </Flex>)}
            

            <ButtonGroup>
                <Button colorScheme="purple" type="submit" >
                    {ventaId ? "EDITAR" : "CREAR"}
                </Button>
                <Button colorScheme="green" onClick={()=> append(defaultPM)}>Agregar</Button>
                <Button colorScheme="gray"  onClick={()=>{
                router.push("/")
                }}>VOLVER</Button>
            </ButtonGroup>
        
        </form>
        <DevTool control={control}/>
        </>
    )
}



export default VentasForm