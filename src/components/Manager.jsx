import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            passwordArray = JSON.parse(passwords)
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/hidden.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password Saved !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast("Error:Password not saved!")
        }
    }

    const editPassword = (id) => {
        console.log("Editing password wit id", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = (id) => {
        console.log("Deleting password wit id", id)
        let c = confirm("Are you sure Delete this password ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password, Deleted!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=" md:mycontainer md:px-0 px-2 p-3">
                <h1 className="text-4xl text font-bold text-center">
                    <span className='text-green-700'>&lt;</span>
                    <span>Pass</span><span className='text-green-700'>Op/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="text-black flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handleChange} className='rounded-full p-4 py-1 border border-green-500 w-full' type="text" name="site" id="site" placeholder='Enter website url' />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full p-4 py-1 border border-green-500 w-full' type="text" placeholder='Enter Username' name="username" id="username" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full p-4 py-1 border border-green-500 w-full' type="password" placeholder='password' name="password" id="password" />
                            <span className='absolute right-0 top-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2 ' width={35} src="icons/eye.png" alt="eye" />
                            </span>

                        </div>
                    </div>


                    <button onClick={savePassword} className='flex w-fit justify-center items-center bg-green-400 rounded-full p-5 py-2 gap-2 text-black font-extrabold border border-green-800 hover:bg-green-600'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center border border-white py-2'><div className='items-center justify-center flex'><a href={item.site} target="_blank">{item.site}</a><div className='lordiconcopy w-7 cursor-pointer pl-1' onClick={() => { copyText(item.site) }}><img src="icons/copy.svg" alt="copy" /></div></div></td>
                                        <td className='text-center border border-white  py-2 '><div className='items-center justify-center flex'><span>{item.username}</span><div className='lordiconcopy w-7 cursor-pointer pl-1' onClick={() => { copyText(item.username) }}><img src="icons/copy.svg" alt="copy" /></div></div></td>
                                        <td className='text-center border border-white py-2 '><div className='items-center justify-center flex'><span>{item.password}</span><div className=' lordiconcopy w-7 cursor-pointer pl-1' onClick={() => { copyText(item.password) }}><img src="icons/copy.svg" alt="copy" /></div></div></td>
                                        <td className='text-center border border-white py-2 flex justify-center'>
                                            <span className='cursor-pointer mx-1 w-7' onClick={() => { editPassword(item.id) }}><img src="icons/edit.svg" alt="edit" /></span>
                                            <span className='cursor-pointer mx-1 w-7' onClick={() => { deletePassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon></span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>

            </div >

        </>
    );
}

export default Manager;
