import { UploadedFile } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { Body, Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.create(dto, image);
  }
}
