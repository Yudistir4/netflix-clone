import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { HandThumbUpIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Genre } from '../typing'

const MyModal = () => {
    const [modal, setModal] = useRecoilState(modalState)
    const [muted, setMuted] = useState(true)
    const [movie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {

        if (!movie) return;
        const fetchMovie = async () => {
            const data = await fetch(`https://api.themoviedb.org/3/${movie?.media_type === "tv" ? "tv" : "movie"
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`).then(response => response.json())
            if (data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer'
                )
                setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()


    }, [movie])


    return (
        <>


            <Modal isOpen={modal} onClose={() => setModal(false)} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>


                    <ModalBody className='bg-[#181818] text-white !p-0 !rounded overflow-hidden'>
                        <div className="relative pt-[56.25%]">
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailer}`}
                                width="100%"
                                height="100%"
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                playing
                                muted={muted}
                            />

                            <button onClick={() => setModal(false)} className="rounded-full  bg-[#181818] absolute top-3 right-3 h-10 w-10 flex items-center justify-center "> <XMarkIcon className='h-5 w-5' /></button>
                            <div className="absolute flex   bottom-0 left-0 p-3 justify-between w-full">
                                <div className="flex gap-2">
                                    <button className='bg-white text-black flex items-center justify-center rounded-md px-5 py-2 gap-2 font-bold   '><FaPlay /> Play</button>
                                    <button className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 flex items-center justify-center hover:bg-white/20 hover:border-white"> <PlusIcon className='h-6 w-6' />  </button>
                                    <button className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 flex items-center justify-center hover:bg-white/20 hover:border-white"> <HandThumbUpIcon className='h-6 w-6' />  </button>
                                </div>
                                <button onClick={() => setMuted(prev => !prev)} className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 flex items-center justify-center hover:bg-white/20 hover:border-white">{muted ? <FaVolumeMute className='h-6 w-6' /> : <FaVolumeUp className='h-6 w-6' />}  </button>
                            </div>
                        </div>

                        <div className="px-3 py-5">

                            <div className="flex mb-5 items-center gap-2">
                                <p className="text-green-500 font-bold">{Math.round(movie?.vote_average * 10)}% Match </p>
                                <p className="font-thin">{movie?.release_date}</p>
                                <p className="rounded border h-4 w-6 flex items-center justify-center text-xs">HD</p>
                            </div>
                            <div className="flex justify-between gap-5">
                                <p className='w-[60%]'>{movie?.overview}</p>
                                <div className="flex flex-col gap-3 w-[40%]">
                                    <p><span className="text-[gray]">Genres: </span>{genres.map(genre => genre.name).join(", ")}</p>
                                    <p><span className="text-[gray]">Original Languange: </span>{movie?.original_language}</p>
                                    <p><span className="text-[gray]">Total Votes: </span>{movie?.vote_count}</p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}
export default MyModal