// 导入自己需要的组件
import {
  Container, Header, Main, Footer, Button, Input, Table, TableColumn, Pagination, Form, FormItem, Tree, Dialog, Message, Radio, RadioGroup, RadioButton,Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Aside,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Drawer,
  Card,
  Select,
  Option,
  Switch,
  upload
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Footer)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Aside)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Drawer)
    Vue.use(Card)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Switch)
    Vue.use(upload)
    Vue.prototype.$message = Message
    // 解决首次进入自动弹出的问题
    Vue.component(Message.name, Message)
  }
}
export default element
