const db=require("../../common/js/db")
const config=require("../../common/js/config")
global.rootVue=new Vue({
    el:"#app",
    data:{
        envId:"",
        arrEnv:[],
        remember:0,
        username:"",
        password:"",
        addPending:false,
        showAdd:false,
        envEdit:{
            name:"",
            url:""
        },
        objVersion:{},
        objRegister:{
            username:"",
            pwd:"",
            pwd1:"",
            email:"",
            question:"",
            answer:""
        },
        showRegister:false,
        registerPending:false,
        member:"",
        arrMember:[],
        showApplyMember:false,
        memberEdit:{
            user:"",
            pass:"",
            name:"",
            remark:""
        },
        reset:{
            question:"",
            pwd:"",
            pwd1:"",
            answer:"",
            resetPending:false,
            questionPending:false,
            step:0,
            username:""
        },
        showReset:false
    },
    watch:{
        "envId":{
            handler:async function () {
                if(!this.envId)
                {
                    return;
                }
                await this.handleChangeEnvId();
            },
        }
    },
    methods:{
        handleUrl:function (local) {
            let url="",envId;
            if(local)
            {
                envId=_session.get("env");
            }
            else
            {
                envId=this.envId;
            }
            if(envId=="doclever.cn")
            {
                url=window.debug?"http://localhost:8090":"http://doclever.cn:8090"
            }
            else
            {
                for(let o of this.arrEnv)
                {
                    if(o.id==envId)
                    {
                        url=o.url;
                        break;
                    }
                }
            }
            if(!url.startsWith("http://") && !url.startsWith("https://"))
            {
                url="http://"+url;
            }
            return url;
        },
        handleChangeEnvId:async function (local) {
            let tip;
            try
            {
                let url=this.handleUrl(local);
                url+="/user/version";
                tip=_$.loading("?????????????????????...");
                let obj=await _net.get(`${url}`,null,null,null,1,5000);
                tip.close()
                this.objVersion=obj.data;
                _$.tip("????????????",1);
            }
            catch (err)
            {
                tip.close()
                this.objVersion={};
                _$.err("?????????????????????");
            }
        },
        add:function () {
            this.envEdit={
                name:"",
                url:"",
            }
            this.showAdd=true
        },
        addEnv:async function () {
            if(!this.envEdit.name)
            {
                _$.tip("?????????????????????",0);
                return false;
            }
            else if(!this.envEdit.url)
            {
                _$.tip("????????????????????????",0);
                return false;
            }
            this.addPending=true;
            let obj;
            try
            {
                obj=await db.addEnv(this.envEdit.id,this.envEdit.name,this.envEdit.url);
            }
            catch (err)
            {
                this.addPending=false;
                _$.tip(err.msg,0);
                return;
            }
            _$.tip("????????????",1);
            this.addPending=false;
            if(this.envEdit.id)
            {
                for(let o of this.arrEnv)
                {
                    if(this.envEdit.id==o.id)
                    {
                        o.name=this.envEdit.name;
                        o.url=this.envEdit.url;
                    }
                }
            }
            else
            {
                this.arrEnv.push(obj);
            }
            this.showAdd=false;
        },
        removeEnv:async function (item,index) {
            let bOk=await _$.confirm("?????????????????????");
            if(bOk)
            {
                await db.delEnv(item.id);
                await this.$apiLogin.path.delEnv(item.id);
                this.arrEnv.splice(index,1);
                _$.tip("????????????",1);
            }
        },
        editEnv:function (item) {
            this.envEdit=_$.clone(item);
            this.showAdd=true;
        },
        refresh:async function () {
            await this.handleChangeEnvId();
        },
        register:async function () {
            var _this=this;
            if(!this.objRegister.username || !this.objRegister.pwd || !this.objRegister.pwd1 || !this.objRegister.question || !this.objRegister.answer || !this.objRegister.email)
            {
                this.$message.error("???????????????,???????????????????????????????????????,??????????????????");
                return;
            }
            else if(this.objRegister.pwd!=this.objRegister.pwd1)
            {
                this.$message.error("??????????????????????????????");
                return;
            }
            else if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(this.objRegister.email)))
            {
                _$.tip("?????????????????????",0);
                return;
            }
            this.registerPending=true;
            let url=this.handleUrl();
            let data=await _net.post(url+"/user/save",{
                name:_this.objRegister.username,
                password:_this.objRegister.pwd,
                question:_this.objRegister.question,
                answer:_this.objRegister.answer,
                email:_this.objRegister.email
            },null,null,0,1)
            _this.registerPending=false;
            if(data.code==200)
            {
                _$.tip("????????????",1);
                this.showRegister=false;
            }
            else
            {
                _$.tip(data.msg,0);
            }
        },
        login:async function () {
            try
            {
                if(!this.username || !this.password)
                {
                    throw '???????????????????????????';
                }
                let url=this.handleUrl();
                let data=await _net.post(url+"/user/login",{
                    name:this.username,
                    password:this.password,
                },null,null,null,1,0)
                if(data.code!=200)
                {
                    throw "?????????????????????"
                }
                let bNeeded=await this.$apiLogin.update.checkIfNeededUpdate(this.envId,this.objVersion.version);
                let contentPath;
                if(bNeeded && this.objVersion.url)
                {
                    contentPath=await (this.$apiLogin.update.updateEnv(this.envId,url+this.objVersion.url));
                }
                else
                {
                    contentPath=this.$apiLogin.path.getEnvPath(this.envId);
                }
                let online=false;
                if(!this.member && ((!window.debug && url.includes("doclever.cn")) || (window.debug && url.includes("localhost:8090"))))
                {
                    online=true;
                }
                let id=await this.memberLogin(online,data.data._id);
                _$.tip("????????????",1);
                _session.clear()
                _session.update(data.data,this.remember,this.password);
                sessionStorage.setItem("env",this.envId);
                if(this.remember)
                {
                    _session.set("env",this.envId);
                    if(this.member)
                    {
                        _session.set("member",this.member)
                    }
                }
                else
                {
                    _session.remove("env");
                }
                sessionStorage.setItem("baseUrl",url)
                sessionStorage.setItem("first","1");
                sessionStorage.setItem("loginUrl",location.href);
                sessionStorage.setItem("version",this.objVersion.version);
                setTimeout(()=> {
                    location.href=window.debug?`/web/console/index.html`:(contentPath+"/content/index.html");
                },1500);
            }
            catch (err)
            {
                _$.err(err);
            }
        },
        applyMember:async function () {
            let obj={};
            if(!this.memberEdit.user)
            {
                _$.tip("??????????????????",0);
                return;
            }
            else
            {
                obj.user=this.memberEdit.user;
            }
            if(!this.memberEdit.pass)
            {
                _$.tip("???????????????",0);
                return;
            }
            else
            {
                obj.pass=this.memberEdit.pass;
            }
            if(!this.memberEdit.name)
            {
                _$.tip("?????????????????????",0);
                return;
            }
            else
            {
                obj.name=this.memberEdit.name;
            }
            obj.mac=await this.$apiLogin.macAddress();
            if(this.memberEdit.remark)
            {
                obj.remark=this.memberEdit.remark;
            }
            let data=await _net.post(config.online+"/member/apply",obj,{
                desktop:"1"
            },null,0,0,1);
            if(data.code==200 || data.code==56)
            {
                if(data.code==200)
                {
                    _$.tip("????????????????????????????????????",1);
                }
                else
                {
                    _$.tip("???????????????",1);
                }
                this.showApplyMember=false;
                db.editMember(obj.user,obj.pass);
                this.arrMember.push({
                    user:obj.user,
                    pass:obj.pass,
                    disabled:data.code==200?true:false
                })
            }
            else
            {
                _$.tip(data.msg,0);
            }
            this.memberEdit={
                user:"",
                pass:"",
                name:obj.mac,
                remark:""
            }
        },
        getValidMember:async function()
        {
            let arr=await db.getAllMember();
            let mac=await this.$apiLogin.macAddress();
            let arr1=arr.map(function (obj) {
                return {
                    user:obj.user,
                    pass:obj.pass,
                    mac:mac
                }
            })
            let data=await _net.post(config.online+"/member/validmemeber",{
                member:JSON.stringify(arr1)
            },{
                desktop:"1"
            },null,0,0,1);
            if(data.code==200)
            {
                for(let o of arr)
                {
                    if(data.data.includes(o.user))
                    {
                        o.disbaled=false;
                    }
                    else
                    {
                        o.disabled=true;
                    }
                }
                this.arrMember=arr;
            }
            else
            {
                _$.tip(data.msg,0);
            }
        },
        memberLogin:async function (online,userId,envId) {
            let id;
            if(!online)
            {
                if(!this.member)
                {
                    return;
                }
                let obj;
                for(let o of this.arrMember)
                {
                    if(this.member==o.user)
                    {
                        obj=o;
                        break;
                    }
                }
                if(!obj)
                {
                    return;
                }
                let mac=await this.$apiLogin.macAddress();
                let data=await _net.post(config.online+"/member/login",{
                    mac:mac,
                    user:online?this.username:obj.user,
                    pass:obj.pass
                },{
                    desktop:"1"
                },null,0,0,1);
                if(data.code!=200)
                {
                    $.tip(data.msg,0);
                    return;
                }
                id=data.data;
            }
            else
            {
                id=userId;
            }
            let objPlugin=await this.$apiLogin.update.handlePluginInfo(envId?envId:this.envId,id);
            let data=await _net.get(config.online+"/member/validplugin",{
                content:JSON.stringify(objPlugin),
                version:this.objVersion.version
            },{
                desktop:"1"
            },null,1);
            if(data.code!=200)
            {
                $.tip(data.msg,0);
                return;
            }
            sessionStorage.setItem("member",id);
            let arr=[];
            for(let o of data.data)
            {
                if(o.compatible)
                {
                    arr.push({
                        id:o.id,
                        version:o.version
                    })
                }
            }
            sessionStorage.setItem("plugin",JSON.stringify(arr));
            sessionStorage.setItem("version",this.objVersion.version);
            return id;
        },
        removeMember:async function(item,index)
        {
            let bRet=await _$.confirm("?????????????????????");
            if(bRet)
            {
                if(!item.disabled)
                {
                    let bRet1=await $.confirm("?????????????????????????????????");
                    if(bRet1)
                    {
                        let mac=await this.$apiLogin.macAddress();
                        let obj=await _net.delete(config.online+"/member/clientbind",{
                            mac:mac,
                            user:item.user,
                        },{
                            desktop:"1"
                        },null,1);
                        if(obj.code==200)
                        {
                            await this.$apiLogin.path.delPlugin(obj.data);
                        }
                    }
                }
                await db.removeMember(item.user);
                this.arrMember.splice(index,1);
                _$.tip("????????????",1);
            }
        },
        getQuestion:function () {
            var _this=this;
            if(!this.reset.username)
            {
                _$.tip("?????????????????????",0);
                return;
            }
            this.reset.questionPending=true;
            let url=this.handleUrl();
            _net.get(url+"/user/question",{
                name:_this.reset.username,
            },null,null,1,0).then(function (data) {
                _this.reset.questionPending=false;
                if(data.code==200)
                {
                    _this.reset.step=1;
                    _this.reset.question=data.data;
                }
                else
                {
                    _$.notify(data.msg,0);
                }
            })
        },
        resetUser:function () {
            var _this=this;
            if(!this.reset.pwd || !this.reset.pwd1 || !this.reset.answer )
            {
                _$.tip("??????,????????????,??????????????????????????????",0);
                return;
            }
            else if(this.reset.pwd!=this.reset.pwd1)
            {
                _$.tip("??????????????????????????????",0);
                return;
            }
            this.reset.questionPending=true;
            let url=this.handleUrl();
            _net.put(url+"/user/reset",{
                name:_this.reset.username,
                answer:_this.reset.answer,
                password:_this.reset.pwd
            },null,null,1).then(function (data) {
                _this.reset.questionPending=false;
                if(data.code==200)
                {
                    _$.notify("????????????",1);
                    _this.showReset=false;
                }
                else
                {
                    _$.notify(data.msg,0);
                }
            })
        }
    },
    created:async function () {
        this.getValidMember();
        this.memberEdit.name=this.$apiLogin.computeName();
        this.arrEnv=await db.getAllEnv();
        let tip;
        this.$on("startUpdate",function () {
            tip=_$.loading("????????????????????????");
        })
        this.$on("updateProcess",function (val) {
            tip.message=`??????????????????${parseInt(val*100)+"%"}`
        })
        this.$on("updateUnzip",function () {
            tip.message="?????????????????????";
        })
        this.$on("finishUpdate",function (val) {
            tip.close();
            _$.tip("????????????",1);
        })
        if(_session.get("env") && _session.get("remember") && _session.get("name") && _session.get("password"))
        {
            try
            {
                let bExist=false;
                this.member=_session.get("member");
                for(let o of this.arrMember)
                {
                    if(o.user==this.member)
                    {
                        bExist=true;
                        break;
                    }
                }
                await this.handleChangeEnvId(1);
                let url=this.handleUrl(1);
                let data=await _net.post(url+"/user/login",{
                    name:_session.get("name"),
                    password:_session.get("password"),
                },null,null,null,1,0)
                if(data.code!=200)
                {
                    throw "?????????????????????"
                }
                let bNeeded=await this.$apiLogin.update.checkIfNeededUpdate(_session.get("env"),this.objVersion.version);
                let contentPath;
                if(bNeeded && this.objVersion.url)
                {
                    contentPath=await (this.$apiLogin.update.updateEnv(_session.get("env"),url+this.objVersion.url));
                }
                else
                {
                    contentPath=this.$apiLogin.path.getEnvPath(_session.get("env"));
                }
                let online=false;
                if(!this.member && ((!window.debug && url.includes("doclever.cn")) || (window.debug && url.includes("localhost:8090"))))
                {
                    online=true;
                }
                let id;
                if(online || (!online && bExist))
                {
                    id=await this.memberLogin(online,data.data._id,_session.get("env"));
                }
                let password=_session.get("password");
                let env=_session.get("env");;
                _session.clear();
                _session.update(data.data,1,password);
                _session.set("env",env);
                sessionStorage.setItem("env",env);
                sessionStorage.setItem("baseUrl",url)
                if((online || (!online && bExist)) && id)
                {
                    _session.set("member",this.member)
                }
                sessionStorage.setItem("first","1");
                sessionStorage.setItem("loginUrl",location.href);
                sessionStorage.setItem("version",this.objVersion.version);
                location.href=window.debug?`/web/console/index.html`:(contentPath+"/content/index.html");
            }
            catch (err)
            {
                _$.err(err);
                _$.stopLoading();
            }
        }
        else
        {
            _$.stopLoading();
        }
    },
})
_$.ready(function () {
    _$.startLoading();
})