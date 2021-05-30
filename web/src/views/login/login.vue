<template>
    <div>
        登录页面
    </div>
</template>
<script>
import { userLogin } from '@/service/api/login';
export default {
    mounted(){
        this.submit();
    },
    methods: {
        async submit(){
            let params = {
                username: '张三'
            };
            const data = await userLogin(params);
            console.log(data);
        }
    }
}
</script>