import { Button, Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { Input } from '@headlessui/react'
import clsx from 'clsx'

const ThreeSecModal = ({ close, isOpen }) => {


    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Update Title & Description
                        </DialogTitle>
                        <p className="mt-2 text-sm/6 text-white/50">
                            {/* title */}
                            <Input
                                className={clsx(
                                    'mt-3 block w-full rounded-lg border-2 bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                placeholder='Title'
                            />
                        </p>
                        <p className="mt-2 text-sm/6 text-white/50">
                            {/* description */}
                            <Textarea
                                className={clsx(
                                    'mt-3 block w-full resize-none rounded-lg border-2 bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                rows={3}
                                placeholder='Description'
                            />
                        </p>
                        <div className="mt-4">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                onClick={close}
                            >
                                Got it, thanks!
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ThreeSecModal
