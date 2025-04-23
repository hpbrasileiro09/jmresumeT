import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { EntryModule } from './entry/entry.module';
import { CategoryModule } from './category/category.module';
import { ParamModule } from './param/param.module';
import { FichaModule } from './ficha/ficha.module';
import { EncontroModule } from './encontro/encontro.module';
import { NotaModule } from './nota/nota.module';

@Module({
  imports: [
    EntryModule,
    CategoryModule,
    ParamModule,
    FichaModule,
    EncontroModule,
    NotaModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
