import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import {DoctorProfileStudioPreview} from './components/previews/DoctorProfileStudioPreview'
import {PostStudioPreview} from './components/previews/PostStudioPreview'
import {SiteSettingsStudioPreview} from './components/previews/SiteSettingsStudioPreview'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'post') {
    return S.document().views([S.view.form(), S.view.component(PostStudioPreview).title('Preview')])
  }

  if (schemaType === 'configuracoesSite') {
    return S.document().views([
      S.view.form(),
      S.view.component(SiteSettingsStudioPreview).title('Preview'),
    ])
  }

  if (schemaType === 'informacoesMedicos') {
    return S.document().views([
      S.view.form(),
      S.view.component(DoctorProfileStudioPreview).title('Preview'),
    ])
  }

  return S.document().views([S.view.form()])
}
