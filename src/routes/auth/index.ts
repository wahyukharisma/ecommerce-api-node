import { Router } from 'express';
import { createUserSchema, usersTable, loginUserSchema } from '../../db/schema/user.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js'
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody;

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const [user] = await db
            .insert(usersTable)
            .values(data).returning();

        // @ts-ignore
        delete user.password;
        res.status(200).json({ user });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
});

router.post('/login', validateData(loginUserSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;

        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (!user) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret', { expiresIn: '30d' });

        // @ts-ignore
        delete user.password;
        res.status(200).json({ token, user });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
});

export default router;