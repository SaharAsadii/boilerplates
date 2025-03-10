import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo"
import { MongooseModule } from "@nestjs/mongoose"
import { EventsModule } from "./events/events.module"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    EventsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
