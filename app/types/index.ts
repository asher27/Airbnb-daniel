import {User} from "@prisma/client";


// Only plain objects can be passed to Client Components from Server Components. Date Objects are not supported
// Warning 이 날때 아래와 같이 형변환을 통해서 사용하면 되는데..현재 Nextjs 버전에서는 나지 않는다
// 일단, 따라서 작성하자
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
