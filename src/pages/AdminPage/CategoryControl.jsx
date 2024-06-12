import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { fetchPostNewCategory, fetchCategoryList, fetchDeleteCategory, fetchEditCategory } from '../../store/categorySlice'

function CategoryControl() {
    let categoryList = Object.values(useSelector((state) => state.CATEGORY.categoryList));
    let token = localStorage.getItem('token')
    const dispatch = useDispatch()

    const [showDropdown, setShowDropdown] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        parent: ""
    })

    const [mode, setMode] = useState("")

    const [selectAll, setSelectAll] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if (mode === "") {
            dispatch(fetchPostNewCategory([token, form])).then((result) => {
                if (result.payload) {
                    dispatch(fetchCategoryList())
                }
            })
        } else {
            dispatch(fetchEditCategory({
                token: token,
                content: {
                    id: mode,
                    content: form
                }
            })).then((result) => {
                if (result.payload) {
                    dispatch(fetchCategoryList())
                }
            })
        }
        handleClear()
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSelectAll() {
        setSelectAll(!selectAll)
        const newData = ""
    }

    function handleEdit(e) {
        e.preventDefault()
        const id = e.target.id;
        const item = categoryList.find(item => item.ID === Number(id))
        setForm({
            name: item.name,
            description: item.desc,
            parent: item.parent,
        })
        setMode(e.target.id)
    }

    function handleDelete(e) {
        e.preventDefault()
        dispatch(fetchDeleteCategory([token, e.target.id])).then((result) => {
            if (result.payload) {
                dispatch(fetchCategoryList())
            }
        })
    }

    function handleClear() {
        setForm({
            name: "",
            description: "",
            parent: ""
        })
        setShowDropdown(false)
        setMode("")
    }
    useEffect(() => {
        if (form.parent !== 0 && form.parent !== "") {
            setShowDropdown(true)
            let selectElement = document.getElementById("pickParent")
            if (selectElement) {
                selectElement.value = form.parent
            }
        } else if (form.parent === 0) { setShowDropdown(false) }
    }, [form.parent])

    return (
        <main className="login" style={{ width: '-webkit-fill-available' }}>
            <div className="spacing" />
            <div className="tcl-container">
                <div className="tcl-row">
                    <div className="tcl-col-12 tcl-col-sm-6 block-center">
                        <h1 className="form-title text-center">Quản lý danh mục</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <Input
                                name="name"
                                label="Tên danh mục"
                                placeholder="Tên danh mục"
                                autoComplete="off"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Input
                                name="description"
                                label="Miêu tả danh mục"
                                placeholder="Miêu tả danh mục"
                                autoComplete="off"
                                value={form.description}
                                onChange={handleChange}
                            />

                            <div style={{ display: 'flex' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={showDropdown}
                                        onChange={() => {
                                            if (showDropdown) {
                                                setForm({
                                                    ...form,
                                                    parent: ""
                                                })
                                            }
                                            setShowDropdown(!showDropdown)
                                        }}
                                        style={{ marginRight: '1rem' }}
                                    />
                                    Là danh mục con?
                                </label>
                                {showDropdown && (
                                    <div style={{ marginLeft: '1rem' }}>
                                        <label>Thuộc danh mục</label>
                                        <select id="pickParent" style={{ marginLeft: '1rem' }} onChange={handleChange} name="parent">
                                            <option value="">Lựa chọn danh mục</option>
                                            {categoryList.map(i => (
                                                <option value={i.ID} key={i.ID}>{i.name}</option>
                                            ))}
                                        </select></div>

                                )}
                            </div>
                            <div className="d-flex tcl-jc-between tcl-ais-center">
                                <Button htmlType="submit" type="primary" size="large">Thêm mới/chỉnh sửa</Button>
                                <Button htmlType="submit" type="primary" size="large" onClick={handleClear}>Hủy bỏ</Button>
                            </div>
                        </form>
                        <form >
                            <div style={{
                                maxHeight: "20rem",
                                overflow: "scroll",
                                marginTop: "2rem"
                            }}>
                                <table style={{ width: '100%' }}>
                                    <thead style={{
                                        position: "sticky",
                                        top: "0",
                                        background: "white"
                                    }}>
                                        <tr>
                                            <th><input type="checkbox" name="" id="" /></th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {categoryList.map(item => (
                                            <tr key={item.ID}>
                                                <td><input type="checkbox" name="" id="" /></td>
                                                <td>{item.ID}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Button type="primary" size="small" onClick={handleEdit} id={item.ID}>Chỉnh sửa</Button>
                                                    <Button type="primary" size="small" onClick={handleDelete} id={item.ID}>Xóa</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex tcl-jc-between tcl-ais-center" style={{
                                marginTop: "1rem"
                            }}>
                                <Button htmlType="submit" type="primary" size="large">Xóa danh mục đã chọn</Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
            <div className="spacing" />
        </main >
    )
}


export default CategoryControl;