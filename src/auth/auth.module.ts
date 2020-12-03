import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 12;

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', function(next) {
            this.email = this.email.toLowerCase();
            next();
          });

          schema.pre<UserDocument>('save', async function() {
            // only hash the password if it has been modified (or is new)
            if (!this.isModified('password')) return;

            // generate a salt
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

            // hash the password using our new salt
            const hash = await bcrypt.hash(this.password, salt);

            // override the cleartext password with the hashed one
            this.password = hash;
          });
          return schema;
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
