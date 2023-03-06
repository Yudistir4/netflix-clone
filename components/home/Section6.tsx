import React from 'react'
import { home } from '../../constants/staticText'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import { IoMdAdd } from "react-icons/io"
import { ArrowTrendingDownIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'
const Faq = () => {
    return (
        <div className="p-0 mt-10 sm:px-10 max-w-3xl m-auto"  >
            <h2 className="text-2xl font-bold sm:text-5xl text-center mb-5 sm:mb-10">{home.Section6.title}</h2>
            <Accordion allowToggle >
                {home.Section6.faq.map((val, i) =>
                (
                    <AccordionItem key={i} border='0px' mt='8px'>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton className="bg-[#333] border-0" _hover={{
                                        background: "#333"
                                    }}>
                                        <div className="flex-1 text-left">{val.question}</div>
                                        {isExpanded ? (
                                            <XMarkIcon className='h-6' fontSize='12px' />
                                        ) : (
                                            <IoMdAdd className="text-2xl" />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel className="bg-[#333] mt-[1px]" pb={4}>
                                    {val.answer}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                )
                )
                }
            </Accordion>
        </div>
    )
}

export default Faq