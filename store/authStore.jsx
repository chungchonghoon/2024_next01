import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user : null, // 사용자 정보
    token : null, // JWT 토큰
    isAuthenticated : false, // 로그인 여부

    /* user, token의 로그인, 로그아웃시 setter라고 생각하자 */
    login :(user, token) => set({user, token, isAuthenticated : true}), // 로그인 성공시 처리
    logout : () => set({user: null, token: null, isAuthenticated: false}),// 로그인 실패시 처리, 로그아웃시 처리
}))

export default useAuthStore;
